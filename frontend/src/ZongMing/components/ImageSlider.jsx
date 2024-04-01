import React from "react";
import images from "../data/images";
import CustomSlider from "./Slider";
import "../styles/ImageSlider.css";

export default function ImageSlider() {
  return (
    <div className="imageSlider-container">
      <CustomSlider>
        {images.map((image, index) => {
          return <img key={index} src={image.imgURL} alt={image.imgAlt} />;
        })}
      </CustomSlider>
      
    </div>
  );
}
