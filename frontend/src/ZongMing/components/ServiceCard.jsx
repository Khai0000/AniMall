import React from "react";
import "../styles/ServiceCard.css";

const ServiceCard = ({ title, image, description }) => {
  return (
    <div className="cardContainer">
      <div className="imageContainer">
        <img src={image} alt="servicePicture" />
      </div>

      <div className="cardContent">
        <h2 className="title">{title}</h2>
        <p className="descriptionWord">Description:</p>
        <div className="descriptionContainer">
          <p className="description">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
