import React from "react";
import "../styles/RatingChart.css";
import star from "../assets/image/star.png";

const RatingChart = () => {
  // Define ratings data (just for demonstration)
  const ratingsData = [
    { stars: 5, percentage: 20 },
    { stars: 4, percentage: 50 },
    { stars: 3, percentage: 30 },
    { stars: 2, percentage: 10 },
    { stars: 1, percentage: 70 },
  ];

  return (
    <div className="rating-chart">
      {ratingsData.map((item, index) => (
        <div key={index} className="rating-item">
          <div className="container-star">
            {Array(item.stars)
              .fill()
              .map((_, i) => (
                <img key={i} src={star} alt="star" className="star" />
              ))}
            {Array(5 - item.stars)
              .fill()
              .map((_, i) => (
                <div key={i} className="empty-star"></div>
              ))}
          </div>
          <div className="progress-wrap">
            <div className="bar bg">
              <div
                className="bar fg"
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RatingChart;
