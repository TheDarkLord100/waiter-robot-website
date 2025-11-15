import React, { useState, useRef } from "react";
import ROSLIB from "roslib";
import "./control.css";

export default function RobotControlPage() {
  const [ip, setIp] = useState("");
  const [connected, setConnected] = useState(false);
  const rosRef = useRef(null);
  const cmdVelRef = useRef(null);

  const connectToRos = () => {
    if (!ip) return alert("Enter robot IP");

    const ros = new ROSLIB.Ros({
      url: `ws://${ip}:9090`
    });

    ros.on("connection", () => {
      setConnected(true);
      rosRef.current = ros;

      cmdVelRef.current = new ROSLIB.Topic({
        ros: ros,
        name: "/cmd_vel",
        messageType: "geometry_msgs/Twist",
      });

      alert("Connected to robot!");
    });

    ros.on("error", () => {
      alert("Failed to connect!");
    });
  };

  const sendCommand = (linear, angular) => {
    if (!cmdVelRef.current) return;

    const twist = new ROSLIB.Message({
      linear: { x: linear, y: 0, z: 0 },
      angular: { x: 0, y: 0, z: angular },
    });

    cmdVelRef.current.publish(twist);
  };

  return (
    <div className="page">
      
      {/* Connection Bar */}
      <div className="connect-bar">
        <input
          type="text"
          placeholder="Robot IP (e.g. 192.168.0.10)"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
        />
        <button onClick={connectToRos}>
          {connected ? "Connected ✔" : "Connect"}
        </button>
      </div>

      {/* Teleoperation Grid */}
      <div className="grid-container">
        <div></div>
        <button disabled={!connected} onClick={() => sendCommand(0, -1.5)}>Front</button>
        <div></div>

        <button disabled={!connected} onClick={() => sendCommand(-0.1, 0)}>Anti-Clock</button>
        <button disabled={!connected} onClick={() => sendCommand(0, 0)}>⏹</button>
        <button disabled={!connected} onClick={() => sendCommand(0.1, 0)}>Clock</button>

        <div></div>
        <button disabled={!connected} onClick={() => sendCommand(0, 1.5)}>Back</button>
        <div></div>
      </div>

    </div>
  );
}
