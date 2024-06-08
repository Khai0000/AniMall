import React from "react";
import "../styles/SuccessMessage.css";

const SuccessMessage = ({ show, onClose, message }) => {
  if (!show) {
    return null;
  }

  return (
    // <div className="modal-overlay">
    //   <div className="modal-content">
    //     <h2>Success!</h2>
    //     <p>{message}</p>
    //     <button onClick={onClose}>Close</button>
    //   </div>
    // </div>
    <div
      style={{ zIndex: 100}}
      className="forumPostDeleteBackground"
      onClick={onClose}
    >
      <div
        className="forumPostDeleteContainer"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2>{message}</h2>
        <div className="forumPostDeleteButtonContainer">
          <button className="deleteForumPostButton" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
