import React, { useState } from "react";
import "../styles/ProductDetailsInputForm.css";
import useToggle from "../hooks/useToggle.js";
import { NavLink } from "react-router-dom";

const ProductDetailsInputForm = () => {
  const [showTitleInput, toggleTitle] = useToggle();
  const [title, setTitle] = useState("");
  const [showDesciptionInput, toggleDescription] = useToggle();
  const [description, setDescription] = useState("");
  const [showPriceInput, togglePrice] = useToggle();
  const [price, setPrice] = useState("");

  const [isDogFocused, setIsDogFocused] = useState(false);
  const [isCatFocused, setIsCatFocused] = useState(false);
  const [isFoodFocused, setIsFoodFocused] = useState(false);
  const [isAccessoriesFocused, setIsAccessoriesFocused] = useState(false);
  const [isOthersFocused, setIsOthersFocused] = useState(false);

  const handleFocus = (buttonName) => {
    switch (buttonName) {
      case "dog":
        setIsDogFocused((prev) => !prev); // Toggle the focus state
        break;
      case "cat":
        setIsCatFocused((prev) => !prev);
        break;
      case "food":
        setIsFoodFocused((prev) => !prev);
        break;
      case "accessories":
        setIsAccessoriesFocused((prev) => !prev);
        break;
      case "others":
        setIsOthersFocused((prev) => !prev);
        break;
      default:
        break;
    }
  };

  const handleKeyPress = (e, fieldType) => {
    if (e.key === "Enter") {
      if (fieldType === "title") {
        setTitle(e.target.value);
        toggleTitle();
      } else if (fieldType === "description") {
        setDescription(e.target.value);
        toggleDescription();
      } else if (fieldType === "price") {
        setPrice(e.target.value);
        togglePrice();
      }
    }
  };

  return (
    <div className="Product-details-form-container">
      <div onClick={toggleTitle}>
        {showTitleInput ? (
          <input
            onClick={(e) => e.stopPropagation()}
            onKeyPress={(e) => handleKeyPress(e, "title")}
            className="Product-details-form-title-input"
          />
        ) : (
          <span className="Product-details-form-title">{title || "Title"}</span>
        )}
      </div>
      <div onClick={toggleDescription}>
        <br />
        <span className="Product-details-form-description">Description: </span>
        {showDesciptionInput ? (
          <input
            onClick={(e) => e.stopPropagation()}
            className="Product-details-form-description-input"
            onKeyPress={(e) => handleKeyPress(e, "description")}
          />
        ) : (
          <span className="Product-details-form-description-content">
            {description || "Click here to enter description..."}
          </span>
        )}
      </div>
      <div className="Product-details-form-product-categories-container">
        <span className="Product-details-form-product-categories-animal">Animal type: </span>
        <button
            className={`Product-details-form-product-categories-button ${
                isDogFocused ? "focused" : ""
            }`}
            onClick={() => handleFocus("dog")}
            >
            Dog
            </button>
            <button
            className={`Product-details-form-product-categories-button ${
                isCatFocused ? "focused" : ""
            }`}
            onClick={() => handleFocus("cat")}
            >
            Cat
            </button>
            <button
            className={`Product-details-form-product-categories-button ${
                isOthersFocused ? "focused" : ""
            }`}
            onClick={() => handleFocus("others")}
            >
            Others
        </button>
      </div>
      <div className="Product-details-form-product-categories-container">
        <span className="Product-details-form-product-categories-producttype">Product type:  </span>
        <button
            className={`Product-details-form-product-categories-button ${
                isFoodFocused ? "focused" : ""
            } accessories`}
            onClick={() => handleFocus("food")}
            >
            Food
            </button>
            <button
            className={`Product-details-form-product-categories-button ${
                isAccessoriesFocused ? "focused" : ""
            } accessories`}
            onClick={() => handleFocus("accessories")}
            >
            Accessories
        </button>
      </div>
      <div onClick={togglePrice}>
        <br />
        <span className="Product-details-form-price">Price: RM </span>
        {showPriceInput ? (
          <input
            type="number"
            onClick={(e) => e.stopPropagation()}
            className="Product-details-form-price-input"
            onKeyPress={(e) => handleKeyPress(e, "price")}
          />
        ) : (
          <span className="Product-details-form-price-content">
            {price || " XX"}
          </span>
        )}
      </div>
      <div className="Product-details-form-add-back-button">
        <button id="Product-details-form-add-button">
          <svg
            id="Product-details-form-add-button-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="17"
            viewBox="0 0 25 22"
            fill="none"
          >
            <path
              d="M19.6875 15.1247H5.32812C5.15625 15.1247 5.01562 15.2794 5.01562 15.4684L5.01172 17.531C5.01172 17.7201 5.15234 17.8748 5.32422 17.8748H19.6875C19.8594 17.8748 20 17.7201 20 17.531V15.4684C20 15.2794 19.8594 15.1247 19.6875 15.1247ZM19.6875 19.2499H5.31641C5.14453 19.2499 5.00391 19.4046 5.00391 19.5936L5 21.6562C5 21.8453 5.14062 22 5.3125 22H19.6875C19.8594 22 20 21.8453 20 21.6562V19.5936C20 19.4046 19.8594 19.2499 19.6875 19.2499ZM19.6875 10.9995H5.33594C5.16406 10.9995 5.02344 11.1542 5.02344 11.3432L5.01953 13.4058C5.01953 13.5949 5.16016 13.7496 5.33203 13.7496H19.6875C19.8594 13.7496 20 13.5949 20 13.4058V11.3432C20 11.1542 19.8594 10.9995 19.6875 10.9995ZM23.8477 5.02652L13.2188 0.157921C12.9903 0.0536643 12.7454 0 12.498 0C12.2507 0 12.0058 0.0536643 11.7773 0.157921L1.15234 5.02652C0.457031 5.3488 0 6.09649 0 6.93013V21.6562C0 21.8453 0.140625 22 0.3125 22H3.4375C3.60938 22 3.75 21.8453 3.75 21.6562V10.9995C3.75 10.2432 4.32031 9.6244 5.02344 9.6244H19.9766C20.6797 9.6244 21.25 10.2432 21.25 10.9995V21.6562C21.25 21.8453 21.3906 22 21.5625 22H24.6875C24.8594 22 25 21.8453 25 21.6562V6.93013C25 6.09649 24.543 5.3488 23.8477 5.02652Z"
              fill="white"
            />
          </svg>
        <span id="Product-details-form-add-button-text">Add</span>
        </button>
        <NavLink id="Product-details-form-back-button" to="/SellerProduct">Go Back</NavLink>
      </div>
    </div>
  );
};

export default ProductDetailsInputForm;
