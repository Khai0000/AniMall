import React from "react";
import "../styles/ServiceDetailsComment.css";
import dog1 from "../assets/image/dog1.jpg";

const ServiceDetailsComment = () => {
  return (
    <div className="commentServiceDetailsContainer">
      <div className="imageContainerSDC">
        <img src={dog1} alt="author" className="authorimg"/>
      </div>

      <div className="authorContainerSDC">
        <p className="authorNameSDC">Ali</p>
        <p className="contentSDC">
          Petting dogs has always been a source of immense joy and comfort for
          me. There's something incredibly therapeutic about running your
          fingers through their soft fur, feeling their warmth, and witnessing
          the pure happiness in their eyes as they receive affection.
        </p>
      </div>
    </div>
  );
};

export default ServiceDetailsComment;
