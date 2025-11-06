import { useParams, useNavigate } from "react-router-dom";
import "./table.css";
import { useState } from "react";

export default function TablePage() {
  const { table_id } = useParams();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleCallWaiter = () => {
    setModalOpen(true);
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
