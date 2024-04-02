import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/PopupDialog.css";
import { useDispatch } from "react-redux";
import { addComment } from "../slices/postSlice";

const PopupDialog = ({ setShowPopup, postTitle }) => {
  const dispatch = useDispatch();

  const [bodyText, setBodyText] = useState("");

  const handleOnBodyTextChange = (e) => {
    setBodyText(e.target.value);
  };

  const handleOnSubmitClick = () => {
    if (bodyText.trim()==="") {
      alert("Body can't be empty");
      return;
    }
    const newComment = {
      image: null,
      name: "Khai",
      content: bodyText,
    };

    dispatch(addComment({ postTitle, comment: newComment }));
    setShowPopup(false);
  };

  return (
    <div className="popupDialog">
      <div className="popupContainer">
        <button
          className="closeButton"
          onClick={() => {
            setShowPopup(false);
          }}
        >
          <CloseIcon className="closeIcon" />
        </button>
        <p className="popupTitle">Hey Drop Your Review to This!</p>
        <div className="popupCommentContainer">
          <textarea
            rows={7}
            placeholder="Leave your comment here!"
            value={bodyText}
            onChange={handleOnBodyTextChange}
          />
          <button onClick={handleOnSubmitClick}>SUBMIT</button>
        </div>
      </div>
    </div>
  );
};

export default PopupDialog;
