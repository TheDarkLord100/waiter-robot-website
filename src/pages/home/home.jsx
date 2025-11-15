import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1 className="title">Robot Control Center</h1>

      <div className="button-container">
        <button
          className="nav-button"
          onClick={() => navigate("/holonomic")}
        >
          Holonomic Control
        </button>

        <button
          className="nav-button"
          onClick={() => navigate("/control")}
        >
          Differential Control
        </button>
      </div>
    </div>
  );
}
