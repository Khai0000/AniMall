import React from 'react';
import "../styles/SuccessModal.css"; // You can define the styling here

const SuccessfulModal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Success!</h2>
        <p>The service has been added to your cart.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SuccessfulModal;
