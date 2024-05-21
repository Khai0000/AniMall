import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/CommentPopUp.css";
import { useDispatch, useSelector } from "react-redux";
import { addComment, addRating } from "../slices/serviceSlice";
import axios from "axios";

const CommentPopUp = ({ setShowPopup, serviceId, serviceTitle, updateServiceCommentsAndRating }) => {
  const dispatch = useDispatch();
  const [bodyText, setBodyText] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const user = useSelector((state) => state.user.user);

  const handleOnBodyTextChange = (e) => {
    setBodyText(e.target.value);
  };

  const handleRatingClick = (rating) => {
    setSelectedRating(rating === selectedRating ? null : rating);
  };

  const handleOnSubmitClick = async () => {
    if (bodyText.trim() === "" || !selectedRating) {
      alert("Body can't be empty OR Please select a rating");
      return;
    }

    const newComment = {
      username: user.username,
      userUid: user.userUid,
      content: bodyText,
      rating: selectedRating,
    };

    try {
      const addCommentResponse = await axios.post(
        `http://localhost:4000/api/services/${serviceId}/comments`,
        newComment
      );

      if (addCommentResponse.status === 201) {
        const addedComment = addCommentResponse.data;
        dispatch(addComment({ serviceId, serviceComments: addedComment }));
        dispatch(addRating({ serviceId, serviceRating: selectedRating }));
        updateServiceCommentsAndRating(addedComment, selectedRating);
        setShowPopup(false);
        console.log("commentAlibaba:",addedComment);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to submit comment. Please try again later.");
    }
  };

  return (
    <div className="servicePopupDialog">
      <div className="servicePopupContainer">
        <button
          className="closeButton"
          onClick={() => {
            setShowPopup(false);
          }}
        >
          <CloseIcon className="closeIcon" />
        </button>
        <p className="popupTitle">
          Hey Drop Your Rating for our{" "}
          <span className="titlePopUp">{serviceTitle}</span>!
        </p>

        <div className="servicePopupCommentContainer">
          <textarea
            rows={10}
            placeholder="Leave your comment here!"
            value={bodyText}
            onChange={handleOnBodyTextChange}
          />
          <div className="buttonContainer">
            <div className="ratingButtonContainer">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  className={selectedRating === rating ? "selected" : ""}
                  onClick={() => handleRatingClick(rating)}
                >
                  {rating}
                </button>
              ))}
            </div>

            <button className="submitBtn" onClick={handleOnSubmitClick}>
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentPopUp;
