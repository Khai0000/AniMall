import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/CommentPopUp.css";
import { useDispatch } from "react-redux";
import { addComment ,addRating} from "../slices/ProductSlice";

const CommentPopUp = ({ setShowPopup, title }) => {
  const dispatch = useDispatch();

  const [bodyText, setBodyText] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);

  const handleOnBodyTextChange = (e) => {
    setBodyText(e.target.value);
  };

  const handleRatingClick = (rating) => {
    setSelectedRating(rating === selectedRating ? null : rating);
  };

  const handleOnSubmitClick = () => {
    if (bodyText.trim() === "" || !selectedRating) {
      alert("Body can't be empty OR Please select a rating");
      return;
    }

    const newComment = {
      image: null,
      name: "Khai",
      content: bodyText,
      rating: selectedRating,
    };

   // Dispatch the addComment action
  dispatch(addComment({ title, comment: newComment }));
  dispatch(addRating({ title, rating: selectedRating }));

  // Close the popup
  setShowPopup(false);
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
          <span className="titlePopUp">{title}</span>!
        </p>

        <div className="servicePopupCommentContainer">
          <textarea
            rows={15}
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