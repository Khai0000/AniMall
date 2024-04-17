// ServicesHeader.jsx

import React, { useState } from "react";
import "../styles/SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PriceRangeSlider from "./PriceRangeSlider"; // Import the PriceRangeSlider component

const ServicesHeader = ({ onSearch, onPriceRangeChange }) => { // Pass onPriceRangeChange as a prop
  const [isPriceRangeOpen, setIsPriceRangeOpen] = useState(false);

  const handlePriceRangeClick = () => {
    setIsPriceRangeOpen(true);
  };

  const handleClosePriceRangeSlider = () => {
    setIsPriceRangeOpen(false);
  };

  const handleSearchInputChange = (e) => {
    onSearch(e.target.value); 
  };

  return (
    <div className="header-container">
      <div className="input-container">
        <input
          className="search-bar"
          type="text"
          placeholder="Search for services..."
          onChange={handleSearchInputChange}
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
      {isPriceRangeOpen && <PriceRangeSlider onClose={handleClosePriceRangeSlider} onPriceRangeChange={onPriceRangeChange} />} {/* Pass onPriceRangeChange as a prop */}
    </div>
  );
};

export default ServicesHeader;
