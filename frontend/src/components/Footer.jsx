import "../styles/Footer.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useState } from "react";

function Footer({ footerRef, className }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(null);

  const handleRatingButtonClick = (value) => {
    if (rating === value) setRating(null);
    else setRating(value);
  };

  const handleOnSubmitButtonClick = (e) => {
    e.preventDefault();

    if (comment.trim().length === 0) {
      alert("Please leave a comment");
      return;
    }

    if (!rating) {
      alert("Please select a rating");
      return;
    }

    alert(
      `Feedback submitted successfully!\nRating: ${rating}\nComment: ${comment}`
    );

    setComment("");
    setRating(null);
  };

  return (
    <footer ref={footerRef} className={className}>
      <div className="iconContainer">
        <span className="iconCaption">Follow us:</span>
        <InstagramIcon />
        <FacebookIcon />
        <YouTubeIcon />
      </div>

      <div className="ratingContainer">
        <h3>Hey Drop Some Rating to Our Page!</h3>
        <form onSubmit={handleOnSubmitButtonClick}>
          <div className="border">
            <textarea
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Leave your text here!"
            ></textarea>
            <div className="buttonContainer">
              <div className="ratingButtonContainer">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    type="button"
                    className={`ratingButton ${
                      value === rating ? "selected" : ""
                    }`}
                    key={value}
                    onClick={() => handleRatingButtonClick(value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <button className="submitButton" type="submit">
                SUBMIT
              </button>
            </div>
          </div>
        </form>
      </div>

      <p>
        <i>AniMall @Copyright</i>2024. All rights reserved. Powered by
        CHINGCHONG.{" "}
      </p>
    </footer>
  );
}

export default Footer;
