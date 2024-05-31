import React from 'react';
import "../styles/SuccessModal.css";
const SuccessfulModal = ({ show, onClose, message }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Success!</h2>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SuccessfulModal;
