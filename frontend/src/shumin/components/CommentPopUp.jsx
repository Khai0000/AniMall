import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/CommentPopUp.css";
import { useDispatch, useSelector } from "react-redux";
import { addComment ,addRating} from "../slices/ProductSlice";
import axios from "axios";

const CommentPopUp = ({ setShowPopup, id}) => {
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.products.find((product) => product._id === id)
  );

  const [bodyText, setBodyText] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);

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

    try{
      const newComment = {
        image: null,
        name: "Khai",
        content: bodyText,
      };
      const commentRes= await axios.post(`http://localhost:4000/api/product/comment/product/${id}`, newComment);
      const ratingRes = await axios.post(`http://localhost:4000/api/product/rating/product/${id}`,{rating: selectedRating});

      if (commentRes.status === 201 && ratingRes.status===200){
        // Dispatch the addComment action
        dispatch(addComment({ id, comment: newComment }));
        dispatch(addRating({ id, rating: selectedRating }));
      }
      // Close the popup
      setShowPopup(false);
    }catch (error){
      console.log("Error uploading comment: "+ error);
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
          <span className="titlePopUp">{product.title}</span>!
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