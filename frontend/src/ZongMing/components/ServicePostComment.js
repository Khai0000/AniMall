import React, { useState, useEffect } from "react";
import "../styles/ServicePostComment.css";
import ServicePostCommentSkeleton from "./ServicePostCommentSkeleton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { removeComment } from "../slices/serviceSlice";
import axios from "axios";

const ServicePostComment = ({ comment, serviceId, userId }) => {
  const [imageSource, setImageSource] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteCommentPopup, setShowDeleteCommentPopup] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  const handleOnDeleteClick = async () => {
    try {
      const deleteCommentResponse = await axios.delete(
        `http://localhost:4000/api/services/${serviceId}/comments/${comment._id}`
      );
      if (deleteCommentResponse.status === 200) {
        dispatch(
          removeComment({ serviceId: serviceId, commentId: comment._id })
        );
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
    <ServicePostCommentSkeleton />
  ) : (
    <div className="commentDetailsContainerSPC">
      <div className="imageContainerSPC">
        <img src={imageSource} alt="userIcon" />
      </div>

      <div className="authorContainerSPC">
        <p className="authorSPC">{comment.username}</p>
        <p className="contentSPC">{comment.content}</p>
      </div>

      {(comment.userUid === userId || user.role === "admin") && (
        <button
          className="deleteButtonSPC"
          onClick={() => setShowDeleteCommentPopup(true)}
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

export default ServicePostComment;
