import React from "react";
import "../styles/ForumPostComment.css";
import dog1 from "../assets/images/dog1.jpg";

const ForumPostComment = () => {
  return (
    <div className="commentDetailsContainer">
      <div className="imageContainer">
        <img src={dog1} />
      </div>

      <div className="authorContainer">
        <p className="author">Khai</p>
        <p className="content">
          Petting dogs has always been a source of immense joy and comfort for
          me. There's something incredibly therapeutic about running your
          fingers through their soft fur, feeling their warmth, and witnessing
          the pure happiness in their eyes as they receive affection.
        </p>
      </div>
    </div>
  );
};

export default ForumPostComment;
