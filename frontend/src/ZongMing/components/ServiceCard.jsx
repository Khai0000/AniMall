import React from "react";
import "../styles/ServiceCard.css";

const ServiceCard = ({ title, image, description }) => {
  return (
    <div className="serviceCardContainer">
      <div className="serviceImageContainer">
        <img src={image} alt="servicePicture" />
      </div>

      <div className="serviceCardContent">
        <h2 className="title">{title}</h2>
        <p className="serviceDescriptionWord">Description:</p>
        <div className="serviceDescriptionContainer">
          <p className="serviceDescription">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
