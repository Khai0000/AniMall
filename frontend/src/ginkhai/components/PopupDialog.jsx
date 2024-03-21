import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/PopupDialog.css";

const PopupDialog = ({setShowPopup}) => {
  return (
    <div className="popupDialog">
      <div className="popupContainer">
        <button className="closeButton" onClick={()=>{
            setShowPopup(false);
        }}>
          <CloseIcon className="closeIcon" />
        </button>
        <p className="popupTitle">Hey Drop Your Review to This!</p>
        <div className="popupCommentContainer">
          <textarea rows={7} placeholder="Leave your comment here!" />
          <button>SUBMIT</button>
        </div>
      </div>
    </div>
  );
};

export default PopupDialog;
