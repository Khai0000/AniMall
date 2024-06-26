import React, { useState } from "react";
import "../styles/RatingChart.css";
import star from "../assets/image/star.png";

const Tooltip = ({ count, position }) => {
  const style = {
    position: "fixed",
    top: `${position.y}px`,
    left: `${position.x + 20}px`,
    background: "white",
    border: "1px solid black",
    padding: "5px",
  };

  const text = count === 0 ? "No ratings" : `${count} people rated.`;

  return <div style={style}>{text}</div>;
};


const RatingChart = ({ ratings }) => {

  const transformRatingsData = (ratings) => {
    const ratingsData = [];
    const total = ratings.total;

    for (let i = 5; i >= 1; i--) {
      const key = `${i}_stars`;
      const count = ratings[key] || 0;
      const percentage = total === 0 ? 0 : (count / total) * 100;
      ratingsData.push({ stars: i, percentage });
    }

    

    return ratingsData;
  };


  const [hoveredStarCount, setHoveredStarCount] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const ratingsData = transformRatingsData(ratings);
  const handleMouseMove = (e) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };


  return (
    <div
      className="rating-chart"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredStarCount(null)}
    >
      {ratingsData.map((item, index) => (
        <div
          key={index}
          className="rating-item"
          onMouseEnter={() => setHoveredStarCount(item.stars)}
        >
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
      {hoveredStarCount !== null && (
        <Tooltip
          count={ratings[`${hoveredStarCount}_stars`]}
          position={tooltipPosition}
        />
      )}
    </div>
  );
};

export default RatingChart;