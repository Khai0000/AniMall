import React from "react";
import dog from "../assets/image/dog1.jpg";
import "../styles/ServiceCard.css";

const ServiceCard = ({ service }) => {
  return (
    <div className="cardContainer">
      <div className="imageContainer">
        <img src={dog} alt="servicePicture" />
      </div>

      <div className="cardContent">
        <h3 className="title">{service.title}</h3>
        <p className="descriptionWord">Description:</p>
        <div className="descriptionContainer">
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus
            molestie nunc non blandit. Sagittis vitae et leo duis ut diam. Eget
            est lorem ipsum dolor sit. Pretium nibh ipsum consequat nisl vel.
            Amet massa vitae tortor condimentum lacinia quis vel eros donec. Sit
            amet massa vitae tortor condimentum lacinia quis. Bibendum est
            ultricies integer quis auctor elit sed vulputate. Ut etiam sit amet
            nisl purus in mollis nunc sed. Ut etiam sit amet nisl purus in. Et
            netus et malesuada fames ac turpis egestas sed tempus. Iaculis at
            erat pellentesque adipiscing commodo elit at imperdiet dui. Nulla
            facilisi morbi tempus iaculis urna id. Gravida in fermentum et
            sollicitudin ac orci.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
