import React, { useState, useEffect } from "react";
import "../styles/ForumPostComment.css";
import ForumPostCommentSkeleton from "./ForumPostCommentSkeleton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { removeComment } from "../slices/postSlice";
import axios from "axios";

const ForumPostComment = ({ comment, postId }) => {
  const [imageSource, setImageSource] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
        <p className="author">{comment.name}</p>
        <p className="content">{comment.content}</p>
      </div>

      {comment.name === "Khai" && (
        <button className="deleteButton" onClick={handleOnDeleteClick}>
          <DeleteIcon />
        </button>
      )}
    </div>
  );
};

export default ForumPostComment;
