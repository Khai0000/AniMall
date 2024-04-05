import React from "react";
import Slider from "./Slider";
import "../styles/ImageSlider.css"

const ImageSlider = ({ images }) => {
  return (
    <div className="imageSlider-container">
      <Slider>
        {images.map((image, index) => {
          return <img key={index} src={image} alt={`Images ${index}`} className="imageSlider"/>;
        })}
      </Slider>
    </div>
  );
};

export default ImageSlider;
