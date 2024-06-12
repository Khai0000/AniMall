import React from "react";
import "../styles/SuccessModal.css"; 

const SuccessfulModal = ({ show, onClose, message }) => {
  if (!show) {
    return null;
  }

  return (
    <div
      style={{ zIndex: 1000 }}
      className="forumPostDeleteBackground"
      onClick={onClose}
    >
      <div
        className="forumPostDeleteContainer"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {message ? (
          <h2>{message}</h2>
        ) : (
          <h2>The service has been added to your cart.</h2>
        )}

        <div className="forumPostDeleteButtonContainer">
          <button className="deleteForumPostButton" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulModal;
