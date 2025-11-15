import React, { useState, useRef } from "react";
const ROSLIB = window.ROSLIB;
import "./hol.css";

export default function HolonomicControl() {
  const [ip, setIp] = useState("");
  const [vx, setVx] = useState(0);
  const [vy, setVy] = useState(0);
  const [wz, setWz] = useState(0);
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
        messageType: "geometry_msgs/Twist"
      });

      alert("Connected to robot!");
    });

    ros.on("error", () => alert("Failed to connect"));
  };

  // NEW: Holonomic sendCommand: vx, vy, wz
  const sendCommand = (vx, vy, wz) => {
    if (!cmdVelRef.current) return;

    const twist = new ROSLIB.Message({
      linear: { x: vx, y: vy, z: 0 },
      angular: { x: 0, y: 0, z: wz }
    });

    cmdVelRef.current.publish(twist);
  };

  return (
    <div className="page">
      
      {/* Connection Bar */}
      <div className="connect-bar">
        <input
          type="text"
          placeholder="Robot IP (e.g. 192.168.1.20)"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
        />
        <button onClick={connectToRos}>
          {connected ? "Connected ✔" : "Connect"}
        </button>
      </div>

      <div className="connect-bar">
        <input
          type="number"
          placeholder="Vx"
          value={vx}
          onChange={(e) => setVx(parseFloat(e.target.value))}
        />
        <button onClick={null} disabled >
          V_x
        </button>
      </div>
      <div className="connect-bar">
        <input
          type="number"
          placeholder="Vy"
          value={vy}
          onChange={(e) => setVy(parseFloat(e.target.value))}
        />
        <button onClick={null} disabled >
          V_y
        </button>
      </div>
      <div className="connect-bar">
        <input
          type="number"
          placeholder="Wz"
          value={wz}
          onChange={(e) => setWz(parseFloat(e.target.value))}
        />
        <button onClick={null} disabled >
          W_z
        </button>
      </div>

      {/* 3×3 Holonomic Control Grid */}
      <div className="grid-container">
        
        {/* Row 1 */}
        <button disabled={!connected} onClick={() => sendCommand(vx, -vy, 0)}>↑ Front Left</button>
        <button disabled={!connected} onClick={() => sendCommand(vx, 0, 0)}>↑ Front</button>
        <button disabled={!connected} onClick={() => sendCommand(vx, vy, 0)}>↑ Front Right</button>

        {/* Row 2 */}
        <button disabled={!connected} onClick={() => sendCommand(0, -vy, 0)}>← Left</button>
        <button disabled={!connected} onClick={() => sendCommand(0, 0, 0)}>⏹ Stop</button>
        <button disabled={!connected} onClick={() => sendCommand(0, vy, 0)}>→ Right</button>

        {/* Row 3 */}
        <button disabled={!connected} onClick={() => sendCommand(-vx, -vy, 0)}>↓ Back Left</button>
        <button disabled={!connected} onClick={() => sendCommand(-vx, 0, 0)}>↓ Back</button>
        <button disabled={!connected} onClick={() => sendCommand(-vx, -vy, 0)}>↓ Back Right</button>

      </div>

      {/* Rotation row */}
      <div className="rotation-controls">
        <button disabled={!connected} onClick={() => sendCommand(0, 0, -1.0)}>↺ Anti - Clock</button>
        <button disabled={!connected} onClick={() => sendCommand(0, 0, 1.0)}>↻ Clock</button>
      </div>

    </div>
  );
}
