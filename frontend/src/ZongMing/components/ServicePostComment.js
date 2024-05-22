import React, { useState, useEffect } from "react";
import "../styles/ServicePostComment.css";
import ServicePostCommentSkeleton from "./ServicePostCommentSkeleton";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { removeComment } from "../slices/serviceSlice";

const ServicePostComment = ({ comment, serviceTitle }) => { 
  const [imageSource, setImageSource] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleOnDeleteClick = () => {
    dispatch(removeComment({ serviceTitle, commentContent: comment.content }));
  }

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
        <p className="authorSPC">{comment.name}</p>
        <p className="contentSPC">{comment.content}</p>
      </div>

      {comment.name === "Khai" && (
        <button className="deleteButtonSPC" onClick={handleOnDeleteClick}>
          <DeleteIcon />
        </button>
      )}
    </div>
  );
};

export default ServicePostComment;
