import React, { useState, useEffect } from "react";
import "../styles/ForumPostComment.css";
import ForumPostCommentSkeleton from "./ForumPostCommentSkeleton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { removeComment } from "../slices/postSlice";
import axios from "axios";

const ForumPostComment = ({ disable, comment, postId }) => {
  const [imageSource, setImageSource] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteCommentPopup, setShowDeleteCommentPopup] = useState(false);

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const handleOnDeleteClick = async () => {
    try {
      const deleteCommentResponse = await axios.delete(
        `http://localhost:4000/api/community/comment/post/${postId}/${comment._id}`
      );

      if (deleteCommentResponse.status === 200) {
        dispatch(removeComment({ postId: postId, commentId: comment._id }));
      } else {
        console.error(
          "Unexpected response status:",
          deleteCommentResponse.status
        );
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setShowDeleteCommentPopup(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    const fetchImage = async () => {
      try {
        const response = await fetch("https://picsum.photos/300/300");
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageSource(imageUrl);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchImage();
  }, []);

  return isLoading ? (
    <ForumPostCommentSkeleton />
  ) : (
    <div className="commentDetailsContainer">
      <div className="imageContainer">
        <img src={imageSource} alt="userIcon" />
      </div>

      <div className="authorContainer">
        <p className="author">{comment.name.split("//useruid//")[0]}</p>
        <p className="content">{comment.content}</p>
      </div>

      {(comment.name.split("//useruid//")[1] === user.userUid ||
        user.role === "admin") && (
        <button
          className="wjDeleteButton"
          onClick={() => setShowDeleteCommentPopup(true)}
          disabled={disable}
        >
          <DeleteIcon />
        </button>
      )}
      {showDeleteCommentPopup && (
        <div
          className="forumPostDeleteBackground"
          onClick={(e) => {
            setShowDeleteCommentPopup(false);
            e.stopPropagation();
          }}
        >
          <div
            className="forumPostDeleteContainer"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h2>Are you sure you want to delete this comment?</h2>
            <div className="forumPostDeleteButtonContainer">
              <button
                className="deleteForumPostButton"
                onClick={handleOnDeleteClick}
              >
                Delete
              </button>
              <button
                className="deleteForumCloseButton"
                onClick={(e) => {
                  setShowDeleteCommentPopup(false);
                  e.stopPropagation();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumPostComment;
