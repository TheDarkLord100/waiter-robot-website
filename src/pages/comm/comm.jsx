import React from "react";
import { useEffect, useRef, useState } from "react"; // Added useState

export default function CmdVelControls() {
  const rosRef = useRef(null);
  const cmdVelRef = useRef(null);
  const [connected, setConnected] = useState(false);
  // State for IP address input and connection message
  const [ipAddress, setIpAddress] = useState("192.168.1.42"); // Default IP
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");

  // This useEffect will now only handle component cleanup, not connection
  useEffect(() => {
    return () => {
      // Cleanup: Close ROS connection if it exists
      if (rosRef.current) {
        try {
          rosRef.current.close();
        } catch (e) {
          console.error("Error closing ROS connection:", e);
        }
      }
    };
  }, []);

  // New function to handle the connection logic
  const connectToRosbridge = () => {
    // 1. Close existing connection if any
    if (rosRef.current) {
      try {
        rosRef.current.close();
        rosRef.current = null;
      } catch (e) {
        console.error("Error closing previous ROS connection:", e);
      }
    }

    setConnectionStatus(`Attempting to connect to ws://${ipAddress}:9090...`);
    setConnected(false);

    const ROSLIB = window.ROSLIB;

    // Construct the URL using the user-provided IP
    const rosUrl = `ws://${ipAddress}:9090`;

    const ros = new ROSLIB.Ros({ url: rosUrl });
    rosRef.current = ros;

    // Connection Handlers
    ros.on("connection", () => {
      setConnected(true);
      setConnectionStatus("Connected successfully! 🎉");
      // Setup /cmd_vel topic after successful connection
      const cmdVel = new ROSLIB.Topic({
        ros,
        name: "/cmd_vel",
        messageType: "geometry_msgs/Twist",
      });
      cmdVelRef.current = cmdVel;
    });

    ros.on("close", () => {
      setConnected(false);
      setConnectionStatus("Disconnected");
    });

    ros.on("error", (error) => {
      setConnected(false);
      setConnectionStatus(`Error: Could not connect to ${rosUrl}. Check IP address and rosbridge status.`);
      console.error("ROS connection error:", error);
    });
  };

  const sendCmd = (lx, az) => {
    if (!cmdVelRef.current || !connected) return; // Check if connected before sending
    const ROSLIB = window.ROSLIB;
    const msg = new ROSLIB.Message({
      linear: { x: lx, y: 0, z: 0 },
      angular: { x: 0, y: 0, z: az },
    });
    cmdVelRef.current.publish(msg);
  };

  const stop = () => sendCmd(0, 0);

  const holdButton = (lx, az) => ({
    onMouseDown: () => sendCmd(lx, az),
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: () => sendCmd(lx, az),
    onTouchEnd: stop,
  });

  return (
    <div className="flex flex-col items-center gap-4 p-10">
      <h1 className="text-2xl font-bold">ROS2 Teleop</h1>

      {/* --- Connection UI --- */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter Rosbridge IP (e.g., 192.168.1.42)"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-64"
        />
        <button
          onClick={connectToRosbridge}
          className={`p-2 rounded-lg text-white font-semibold ${connected ? "bg-red-500" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {connected ? "Disconnect" : "Connect"}
        </button>
      </div>

      {/* --- Connection Status Message --- */}
      <div
        className={
          "p-2 rounded-xl text-white font-medium " +
          (connected
            ? "bg-green-600"
            : connectionStatus.includes("Error")
            ? "bg-red-700"
            : connectionStatus.includes("Attempting")
            ? "bg-yellow-600"
            : "bg-red-600")
        }
      >
        {connectionStatus}
      </div>
      {/* ----------------------- */}

      <div className="grid grid-cols-3 gap-4 mt-6">
        <button
          className="p-4 rounded-2xl shadow bg-gray-200"
          disabled={!connected} // Disable if not connected
          {...holdButton(0.3, 0)}
        >
          Forward
        </button>
        <button
          className="p-4 rounded-2xl shadow bg-gray-200"
          disabled={!connected}
          {...holdButton(0, 0.5)}
        >
          Left
        </button>
        <button
          className="p-4 rounded-2xl shadow bg-gray-200"
          disabled={!connected}
          {...holdButton(0, -0.5)}
        >
          Right
        </button>
        <button
          className="p-4 rounded-2xl shadow bg-gray-200 col-span-3"
          disabled={!connected}
          {...holdButton(-0.3, 0)}
        >
          Backward
        </button>
      </div>
    </div>
  );
}