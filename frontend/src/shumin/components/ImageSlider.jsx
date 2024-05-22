import React from "react";
import Slider from "./Slider";

export default function ImageSlider({images}) {
  return (
    <div className="imageSlider-container">
      <Slider>
        {images.map((image, index) => {
          return <img key={index} src={image} alt={image.imgAlt} />;
        })}
      </Slider>  
    </div>
  );
}