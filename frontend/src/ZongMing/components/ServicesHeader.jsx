import React, { useState } from "react";
import "../styles/SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PriceRangeSlider from "./PriceRangeSlider"; // Import the PriceRangeSlider component

const ServicesHeader = () => {
  // State to track if the price range slider is open or closed
  const [isPriceRangeOpen, setIsPriceRangeOpen] = useState(false);

  // Function to handle the click event of the "Price Range" button
  const handlePriceRangeClick = () => {
    setIsPriceRangeOpen(true);
  };

  // Function to handle closing the price range slider
  const handleClosePriceRangeSlider = () => {
    setIsPriceRangeOpen(false);
  };

  return (
    <div className="header-container">
      <div className="input-container">
        <input
          className="search-bar"
          type="text"
          placeholder="Search for services..."
        />
        <SearchIcon className="searchIcon" />
      </div>
      <button className="price-range-btn" onClick={handlePriceRangeClick}>
        Price Range
      </button>
      <button className="cart-btn">
        <ShoppingCartIcon className="cart-icon" />
        My Cart
      </button>
      {isPriceRangeOpen && <PriceRangeSlider onClose={handleClosePriceRangeSlider} />}
    </div>
  );
};

export default ServicesHeader;
