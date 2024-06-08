import React, { useState, useEffect } from "react";
import "../styles/ProductPostComment.css";
import ProductPostCommentSkeleton from "./ProductPostCommentSkeleton";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch,useSelector } from 'react-redux';
import { removeComment } from "../slices/ProductSlice";
import axios from "axios";

const ProductPostComment = ({comments, id}) => { 

  const [imageSource, setImageSource] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user);

  const handleOnDeleteClick = async () => {
    try {
      const deleteCommentResponse = await axios.delete(
        `http://localhost:4000/api/product/comment/product/${id}/${comments._id}`
      );

      if (deleteCommentResponse.status === 200) {
        dispatch(removeComment({ id, commentId: comments._id }));
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

      {(comments.name === user.user.username||user.role==='admin') && (
        <button className="deleteButtonSPC" onClick={handleOnDeleteClick}>
          <DeleteIcon />
        </button>
      )}
    </div>
  );
};

export default ProductPostComment;