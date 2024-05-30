import React from "react";
import "../styles/ServiceCard.css";

const ServiceCard = ({service}) => {
  return (
    <div className="serviceCardContainer">
      <div className="serviceImageContainer">
        <img src={service.serviceImages[0]} alt="servicePicture" />
      </div>

      <div className="serviceCardContent">
        <h2 className="title">{service.serviceTitle}</h2>
        <p className="serviceDescriptionWord">Description:</p>
        <div className="serviceDescriptionContainer">
          <p className="serviceDescription">{service.serviceDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
