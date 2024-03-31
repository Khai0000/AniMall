import "../styles/ForumPostDetails.css";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PopupDialog from "../components/PopupDialog";
import ForumPostComment from "../components/ForumPostComment";

const ForumPostDetails = () => {
  const state = useLocation();

  let post = state.state;
  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  useEffect(() => {
    if (post.image[0].includes("jpg")) {
      let imageDir = post.image[0].substring(0, post.image[0].indexOf("."));
      import(`../assets/images/${imageDir}.jpg`)
        .then((image) => {
          setImage(image.default);
        })
        .catch((error) => {
          console.error("Error loading image:", error);
        })
        .finally(() => {});
    } else {
      setImage(post.image[0]);
    }
  }, [post.image]);

  const [showPopup, setShowPopup] = useState(false);

  const handleAddComment = () => {
    setShowPopup(true);
  };

  const handleOnBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="postContainer">
      <div className="postDetailsContainer">
        <div className="headerContainer">
          <div>
            <p className="title">{post.title}</p>
            <p className="author">
              By: <span className="authorName">{post.author}</span>
            </p>
          </div>
          <button className="backButton" onClick={handleOnBackClick}>
            Back
          </button>
        </div>
        <img src={image} alt="Post" />
        <p className="content">{post.content}</p>
      </div>

      <div className="feedbackContainer">
        <div className="reactionContainer">
          <span className="reactionTitle">Reaction</span>
          <div className="goodReactionContainer">
            <IconButton className="reactionButton">
              <ThumbUpOffAltIcon className="reactionIcon" color="success" />
            </IconButton>
            <span style={{ color: "#2e7d32" }}>{post.likes}</span>
          </div>
          <div className="badReactionContainer">
            <IconButton className="reactionButton">
              <ThumbDownOffAltIcon className="reactionIcon" color="error" />
            </IconButton>
            <span style={{ color: "#d32f2f" }}>{post.dislikes}</span>
          </div>
        </div>

        <div className="commentContainer">
          <div className="commentHeader">
            <span className="commentTitle">Comment</span>
            <button className="addPostButton" onClick={handleAddComment}>
              +
            </button>
          </div>
          <div className="commentBody">
            {post.comments.map((comment, index) => {
              return <ForumPostComment comment={comment} />;
            })}
          </div>
        </div>
      </div>

      {showPopup && <PopupDialog setShowPopup={setShowPopup} />}
    </div>
  );
};

export default ForumPostDetails;
