import React from "react";
import "../styles/EditProfilePopup.css";
import {useNavigate} from 'react-router-dom';

const EditProfilePopup = ({message,showEditButton,setShowPopup}) => {

  const navigate = useNavigate();

  return (
    <div className="checkoutPopupContainer">
      <div className="checkoutInfoPopupContainer">
        <p>{message}</p>
        <div className="checkoutPopupButtonContainer">
          {showEditButton && <button className="editButton" onClick={()=>navigate('/authentication/profile')}>Edit</button>}
          <button className={showEditButton?"editCloseButton":"closeButton"} onClick={()=>setShowPopup(false)}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePopup;
