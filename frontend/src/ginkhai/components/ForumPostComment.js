import React, { useState, useEffect } from "react";
import "../styles/ForumPostComment.css";
import ForumPostCommentSkeleton from "./ForumPostCommentSkeleton";

const ForumPostComment = ({ comment }) => {
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
    </div>
  );
};

export default ForumPostComment;
