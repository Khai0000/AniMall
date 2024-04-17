import React, { useState, useEffect } from "react";
import "../styles/ProductPostComment.css";
import ProductPostCommentSkeleton from "./ProductPostCommentSkeleton";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { removeComment } from "../slices/ProductSlice";

const ProductPostComment = ({ comments, title }) => { 
  const [imageSource, setImageSource] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleOnDeleteClick = () => {
    dispatch(removeComment({ title, commentContent: comments.content }));
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
    <ProductPostCommentSkeleton />
  ) : (
    <div className="commentDetailsContainerSPC">
      <div className="imageContainerSPC">
        <img src={imageSource} alt="userIcon" />
      </div>

      <div className="authorContainerSPC">
        <p className="authorSPC">{comments.name}</p>
        <p className="contentSPC">{comments.content}</p>
      </div>

      {comments.name === "Khai" && (
        <button className="deleteButtonSPC" onClick={handleOnDeleteClick}>
          <DeleteIcon />
        </button>
      )}
    </div>
  );
};

export default ProductPostComment;