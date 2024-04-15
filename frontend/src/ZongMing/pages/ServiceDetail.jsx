import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux"; 
import ImageSlider from "../components/ImageSlider";
import "../styles/ServiceDetails.css";
import RatingChart from "../components/RatingChart";
import ServicesAppointment from "../components/ServicesAppointment";
import ServicePostComment from "../components/ServicePostComment";
import CommentPopUp from "../components/CommentPopUp";

const ServiceDetail = () => {
  const { title } = useParams(); // Retrieve the service title from URL parameter
  const [showPopup, setShowPopup] = useState(false);

  // Retrieve service data from Redux store using selector
  const serviceData = useSelector(state => {
    // Assuming your service data is stored in an array called 'services' in your Redux state
    return state.services.find(service => service.serviceTitle === title);
  });

  // If serviceData is not found, return null to prevent errors
  if (!serviceData) {
    return null;
  }

  // Extract serviceTitle, comments, serviceImages, description, price, and ratings from the serviceData
  const { serviceTitle, comments, serviceImages, description, price, ratings } = serviceData;

  const handleAddComment = () => {
    setShowPopup(true);
  };

  return (
    <div className="serviceDetailsContainer">
      <div className="topSideContainer">
        <div className="leftSide">
          <ImageSlider images={serviceImages} />
        </div>

        <div className="rightSide">
          <ServicesAppointment
            title={serviceTitle}
            description={description}
            price={price}
          />
        </div>
      </div>

      <div className="feedbackContainer">
        <div className="ratingContainer">
          <span className="ratingTitle">Reaction</span>
          <div className="ratingBar">
            <RatingChart ratings={ratings} />
          </div>
        </div>

        <div className="commentContainer">
          <div className="commentHeader">
            <span className="commentTitle">Comment</span>
            <button className="addPostButton" onClick={handleAddComment}>
              +
            </button>
          </div>
          <div className="commentBody">
            {comments.map((comment, index) => (
              <ServicePostComment
                comment={comment}
                key={index}
                serviceTitle={serviceTitle}
              />
            ))}
          </div>
        </div>
      </div>
      {showPopup && (
        <CommentPopUp setShowPopup={setShowPopup} serviceTitle={serviceTitle} />
      )}
    </div>
  );
};

export default ServiceDetail;
