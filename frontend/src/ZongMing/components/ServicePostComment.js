import React, { useState, useEffect } from "react";
import "../styles/ServicePostComment.css";
import ServicePostCommentSkeleton from "./ServicePostCommentSkeleton";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { removeComment } from "../slices/serviceSlice";
import axios from "axios";

const ServicePostComment = ({ comment, serviceId,onDelete  }) => {
  const [imageSource, setImageSource] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleOnDeleteClick = async (commentId) => {
    try {
      console.log("Deleting comment with ID:", commentId); // Log comment ID
      const deleteCommentResponse = await axios.delete(
        `http://localhost:4000/api/services/${serviceId}/comments/${commentId}`
      );

      if (deleteCommentResponse.status === 200) {
        onDelete(commentId);
        dispatch(removeComment({ serviceId: serviceId, commentId: commentId }));
      } else {
        console.error(
          "Unexpected response status:",
          deleteCommentResponse.status
        );
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
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

      {comment.username === "ZM" && (
        <button className="deleteButtonSPC" onClick={() => handleOnDeleteClick(comment._id)} >
          <DeleteIcon />
        </button>
      )}
    </div>
  );
};



export default ServicePostComment;
