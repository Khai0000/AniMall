import React from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";
import "../styles/ServiceDetails.css";
import RatingProgress from "../components/RatingChart";

const ServiceDetail = () => {
  // Access the id parameter from the URL
  const { id } = useParams();

  return (
    <div className="serviceDetailsContainer">
      {/* <div className='viewServiceID'>
                <h1>View Service {id}</h1>
            </div> */}
      <div className="topSideContainer">
        <div className="leftSide">
          <div className="imageSlider">
            <ImageSlider />
          </div>
        </div>

        <div className="rightSide"></div>
      </div>

      <div className="feedbackContainer">
        <div className="ratingContainer">
          <span className="ratingTitle">Reaction</span>
          <div className="ratingBar">
            < RatingProgress />
          </div>
        </div>

        <div className="commentContainer">
          <div className="commentHeader">
            <span className="commentTitle">Comment</span>
            <button className="addPostButton">
              +
            </button>
          </div>
          <div className="commentBody">
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
