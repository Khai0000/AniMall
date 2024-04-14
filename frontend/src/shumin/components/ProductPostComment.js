import React, { useState, useEffect } from "react";
import "../styles/ProductPostComment.css";
import ProductPostCommentSkeleton from "./ProductPostCommentSkeleton";

const ProductPostComment = ({ comment, title }) => { 
  const [imageSource, setImageSource] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
        <p className="authorSPC">{comment.name}</p>
        <p className="contentSPC">{comment.comment}</p>
      </div>
    </div>
  );
};

export default ProductPostComment;