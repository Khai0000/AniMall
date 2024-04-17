import React, { useState } from "react";
import "../styles/SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

const ServicesHeader = ({ onSearch, onPriceRangeChange }) => {

  const [showPriceRange, setShowPriceRange] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();

  const handleSearchInputChange = (e) => {
    onSearch(e.target.value);
  };


  const handlePriceRangeSubmit = (event) => {
    event.preventDefault();
    onPriceRangeChange(minPrice, maxPrice); 
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
    onPriceRangeChange(e.target.value, maxPrice); 
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
    onPriceRangeChange(minPrice, e.target.value); 
  };
  
  const togglePriceRange = () => {
    setShowPriceRange(!showPriceRange);
  };



  const handleMyCartButtonClick = () => {
    navigate("/mycart");
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

      {showPriceRange ? (
        <div className="Upper-section-price-range-container product">
          <form onSubmit={handlePriceRangeSubmit}>
            <input
              type="number"
              className="Upper-section-min-price"
              value={minPrice}
              onChange={handleMinPriceChange}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handlePriceRangeSubmit(e);
                }
              }}
            />
            <span className="Upper-section-to">  to  </span>
            <input
              type="number"
              className="Upper-section-max-price"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handlePriceRangeSubmit(e);
                }
              }}
            />
          </form>
        </div>
      ) : (<button className="Upper-section-price-range-button" onClick={togglePriceRange}>Price Range</button>)}

      <button className="cart-btn" onClick={handleMyCartButtonClick}>
        <ShoppingCartIcon className="cart-icon" onClick={handleMyCartButtonClick} />
        My Cart
      </button>

    </div>
  );
};

export default ServicesHeader;
