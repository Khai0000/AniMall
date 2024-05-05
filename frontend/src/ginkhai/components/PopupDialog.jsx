import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/PopupDialog.css";
import { useDispatch } from "react-redux";
import { addComment } from "../slices/postSlice";
import axios from "axios";

const PopupDialog = ({ setShowPopup, postId }) => {
  const dispatch = useDispatch();

  const [bodyText, setBodyText] = useState("");

  const handleOnBodyTextChange = (e) => {
    setBodyText(e.target.value);
  };

  const handleOnSubmitClick = async () => {
    if (bodyText.trim() === "") {
      alert("Body can't be empty");
      return;
    }
    // const newComment = {
    //   image: null,
    //   name: "Khai",
    //   content: bodyText,
    // };

    try {
      const addCommentResponse = await axios.post(
        `http://localhost:4000/api/community/comment/post/${postId}`,
        {
          name: "Khai",
          content: bodyText,
        }
      );

      if (addCommentResponse.status === 201) {
        dispatch(addComment({ postId, comment: addCommentResponse.data }));
        setShowPopup(false);
      }
    } catch (error) {
      console.log(error);
    }
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
