import "../styles/ForumPostDetails.css";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PopupDialog from "../components/PopupDialog";
import ForumPostComment from "../components/ForumPostComment";
import { useSelector, useDispatch } from "react-redux";
import {
  removeDislike,
  removeLike,
  addDislike,
  addLike,
} from "../slices/postSlice";
import ImageSlider from "../components/ImageSlider";

const ForumPostDetails = () => {
  const state = useLocation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const postTitle = state.state.title;

  const post = useSelector((state) =>
    state.posts.find((post) => post.title === postTitle)
  );

  const [loadedImageUrls, setLoadedImageUrls] = useState([]);

  useEffect(() => {
    const loadImageUrls = async () => {
      const loadedImages = [];
      for (const image of post.image) {
        try {
          if (image.startsWith("data:image/")) {
            // If the image URL starts with "data:image/", it indicates a base64 encoded image
            loadedImages.push(image);
          } else if (image.includes(".jpg")) {
            let imageDir = image.substring(0, image.indexOf("."));
            const imageData = await import(`../assets/images/${imageDir}.jpg`);
            loadedImages.push(imageData.default);
          } else {
            // Handle other image types here if needed
            loadedImages.push(image);
          }
        } catch (error) {
          console.error("Error loading image:", error);
        }
      }
      setLoadedImageUrls(loadedImages);
    };

    loadImageUrls();
  },[post.image]);

  const [showPopup, setShowPopup] = useState(false);

  const handleAddComment = () => {
    setShowPopup(true);
  };

  const handleOnBackClick = () => {
    navigate(-1);
  };

  const handleOnLikeClick = () => {
    if (post.peopleWhoLikes.includes("Khai")) {
      dispatch(removeLike({ postTitle, userUid: "Khai" }));
    } else {
      dispatch(addLike({ postTitle, userUid: "Khai" }));
    }
  };

  const handleOnDislikeClick = () => {
    if (post.peopleWhoDislikes.includes("Khai")) {
      dispatch(removeDislike({ postTitle, userUid: "Khai" }));
    } else {
      dispatch(addDislike({ postTitle, userUid: "Khai" }));
    }
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
        <div className="imageContainer">
          <ImageSlider images={loadedImageUrls} />
        </div>
        <p className="content">{post.content}</p>
      </div>

      <div className="feedbackContainer">
        <div className="reactionContainer">
          <span className="reactionTitle">Reaction</span>
          <div className="goodReactionContainer">
            <IconButton className="reactionButton" onClick={handleOnLikeClick}>
              {post.peopleWhoLikes.includes("Khai") ? (
                <ThumbUpIcon className="reactionIcon" color="success" />
              ) : (
                <ThumbUpOffAltIcon className="reactionIcon" color="success" />
              )}
            </IconButton>
            <span style={{ color: "#2e7d32" }}>{post.likes}</span>
          </div>
          <div className="badReactionContainer">
            <IconButton
              className="reactionButton"
              onClick={handleOnDislikeClick}
            >
              {post.peopleWhoDislikes.includes("Khai") ? (
                <ThumbDownAltIcon className="reactionIcon" color="error" />
              ) : (
                <ThumbDownOffAltIcon className="reactionIcon" color="error" />
              )}
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
            {post.comments.length === 0 ? (
              <div className="noCommentContainer">
                <p>The topic have no comment yet! Add yours here!</p>
              </div>
            ) : (
              post.comments.map((comment, index) => {
                return (
                  <ForumPostComment
                    comment={comment}
                    key={index}
                    postTitle={postTitle}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>

      {showPopup && (
        <PopupDialog setShowPopup={setShowPopup} postTitle={post.title} />
      )}
    </div>
  );
};

export default ForumPostDetails;
