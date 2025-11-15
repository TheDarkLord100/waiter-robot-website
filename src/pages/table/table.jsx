import { useParams, useNavigate } from "react-router-dom";
import "./table.css";
import { useState } from "react";

export default function TablePage() {
  const { table_id } = useParams();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleCallWaiter = async () => {
    try {
      const response = await fetch(
        `https://waiter-robot-server.onrender.com/orders/${table_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("Order created:", data);

      setModalOpen(true);
    } catch (error) {
      console.error("Error creating awaiting order:", error);
      alert("Failed to call waiter robot. Please try again.");
    }
  };

  const handleShowMenu = () => {
    navigate("/menu");
  };

  return (
    <div className="robot-page">
      <div className="content-box">
        <h1 className="main-heading">Welcome to Robot Restaurant</h1>
        <p className="table-info">Table {table_id}</p>

        <div className="button-area">
          <button className="action-btn call-btn" onClick={handleCallWaiter}>
            Call Waiter Robot
          </button>

          <button className="action-btn menu-btn" onClick={handleShowMenu}>
            Show Menu
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Thank You!</h2>
            <p>
              Thank you for using our service. <br />
              The waiter will be with you shortly. <br />
              Kindly be patient. 🤖
            </p>
            <button className="close-btn" onClick={() => setModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
