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
  const { title } = useParams();
  const [showPopup, setShowPopup] = useState(false);


  const serviceData = useSelector(state => {

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
            serviceData={serviceData}
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

            <button class="addPostButton" onClick={handleAddComment}>
            <svg class="addPostButton-icon" xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 39 39" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.46548 0.608655C15.7994 -0.202885 23.2006 -0.202885 30.5345 0.608655C34.5951 1.06301 37.8711 4.25534 38.3476 8.32325C39.2175 15.7491 39.2175 23.2508 38.3476 30.6766C37.8711 34.7445 34.5951 37.9369 30.5345 38.3912C23.2006 39.2029 15.7994 39.2029 8.46548 38.3912C4.40488 37.9369 1.1289 34.7445 0.652436 30.6766C-0.217479 23.2516 -0.217479 15.7506 0.652436 8.32561C0.893436 6.34933 1.7959 4.51221 3.21356 3.11198C4.63123 1.71176 6.48101 0.830494 8.46311 0.611021M19.5 7.68431C19.9715 7.68431 20.4237 7.8713 20.7571 8.20415C21.0905 8.53699 21.2778 8.98843 21.2778 9.45914V17.7251H29.5579C30.0294 17.7251 30.4816 17.9121 30.815 18.2449C31.1484 18.5778 31.3357 19.0292 31.3357 19.4999C31.3357 19.9707 31.1484 20.4221 30.815 20.7549C30.4816 21.0878 30.0294 21.2748 29.5579 21.2748H21.2778V29.5407C21.2778 30.0115 21.0905 30.4629 20.7571 30.7957C20.4237 31.1286 19.9715 31.3156 19.5 31.3156C19.0285 31.3156 18.5763 31.1286 18.2429 30.7957C17.9095 30.4629 17.7221 30.0115 17.7221 29.5407V21.2748H9.44212C8.9706 21.2748 8.5184 21.0878 8.18499 20.7549C7.85158 20.4221 7.66427 19.9707 7.66427 19.4999C7.66427 19.0292 7.85158 18.5778 8.18499 18.2449C8.5184 17.9121 8.9706 17.7251 9.44212 17.7251H17.7221V9.45914C17.7221 8.98843 17.9095 8.53699 18.2429 8.20415C18.5763 7.8713 19.0285 7.68431 19.5 7.68431Z" fill="#3C95A9"></path></svg></button>
          </div>
          <div className="commentBody">
            {comments.length === 0 ? (<div className="commentNotFound">
              <p>No comments for this service yet.</p>
            </div>) : comments.map((comment, index) => (
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
