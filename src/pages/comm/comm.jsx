import React from "react";
import { useEffect, useRef } from "react";

export default function CmdVelControls() {
  const rosRef = useRef(null);
  const cmdVelRef = useRef(null);
  const [connected, setConnected] = React.useState(false);

  useEffect(() => {
    const ROSLIB = window.ROSLIB;
    const ros = new ROSLIB.Ros({ url: "ws://192.168.1.42:9090" });
    rosRef.current = ros;

    ros.on("connection", () => setConnected(true));
    ros.on("close", () => setConnected(false));
    ros.on("error", () => setConnected(false));

    const cmdVel = new ROSLIB.Topic({
      ros,
      name: "/cmd_vel",
      messageType: "geometry_msgs/Twist",
    });
    cmdVelRef.current = cmdVel;

    return () => {
      try { ros.close(); } catch (e) {}
    };
  }, []);

  const sendCmd = (lx, az) => {
    if (!cmdVelRef.current) return;
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
      <div className={"p-2 rounded-xl text-white " + (connected ? "bg-green-600" : "bg-red-600")}> 
        {connected ? "Connected to rosbridge" : "Disconnected"} 
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <button className="p-4 rounded-2xl shadow bg-gray-200" {...holdButton(0.3, 0)}>Forward</button>
        <button className="p-4 rounded-2xl shadow bg-gray-200" {...holdButton(0, 0.5)}>Left</button>
        <button className="p-4 rounded-2xl shadow bg-gray-200" {...holdButton(0, -0.5)}>Right</button>
        <button className="p-4 rounded-2xl shadow bg-gray-200 col-span-3" {...holdButton(-0.3, 0)}>Backward</button>
      </div>
    </div>
  );
}
