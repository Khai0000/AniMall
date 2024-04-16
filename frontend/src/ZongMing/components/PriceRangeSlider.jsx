import React, { useState, useEffect, useRef } from "react";
import "../styles/PriceRangeSlider.css";
import logo from "../assets/image/logo.png";

const PriceRangeSlider = ({ onClose, onPriceRangeChange }) => {
  const [minPrice, setMinPrice] = useState(() => {
    const storedMinPrice = localStorage.getItem("minPrice");
    return storedMinPrice ? parseInt(storedMinPrice) : 20;
  });

  const [maxPrice, setMaxPrice] = useState(() => {
    const storedMaxPrice = localStorage.getItem("maxPrice");
    return storedMaxPrice ? parseInt(storedMaxPrice) : 210;
  });

  const priceGap = 50;

  const minRangeRef = useRef(null);
  const maxRangeRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "minPrice") {
      setMinPrice(parseInt(value));
    } else if (name === "maxPrice") {
      setMaxPrice(parseInt(value));
    }
  };

  useEffect(() => {
    localStorage.setItem("minPrice", minPrice);
    localStorage.setItem("maxPrice", maxPrice);
  }, [minPrice, maxPrice]);

  useEffect(() => {
    if (minRangeRef.current && maxRangeRef.current) {
      const rangevalue = document.querySelector(
        ".slider-container .price-slider"
      );

      const diff = maxPrice - minPrice;

      if (diff < priceGap) {
        if (maxPrice + priceGap <= 1000) {
          setMinPrice(maxPrice - priceGap);
        } else {
          setMaxPrice(minPrice + priceGap);
        }
      }

      minRangeRef.current.value = minPrice;
      maxRangeRef.current.value = maxPrice;
      rangevalue.style.left = `${(minPrice / minRangeRef.current.max) * 100}%`;
      rangevalue.style.right = `${
        100 - (maxPrice / maxRangeRef.current.max) * 100
      }%`;
    }
  }, [minPrice, maxPrice]);

  const handleRangeChange = (e) => {
    const minVal = parseInt(minRangeRef.current.value);
    const maxVal = parseInt(maxRangeRef.current.value);
    const diff = maxVal - minVal;

    if (diff < priceGap) {
      if (e.target.className === "min-range") {
        setMinPrice(maxVal - priceGap);
      } else {
        setMaxPrice(minVal + priceGap);
      }
    } else {
      setMinPrice(minVal);
      setMaxPrice(maxVal);
    }

    onPriceRangeChange(minVal, maxVal);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="range-box open">
      <div className="animallLogo">
        <img src={logo} alt="AniMall logo" />
      </div>
      <div className="custom-wrapper">
        <div className="header">
          <h2 className="projtitle">Price Range Slider</h2>
        </div>
        <div className="price-input-container">
          <div className="price-input">
            <div className="price-field">
              <span>Minimum Price</span>
              <input
                type="number"
                name="minPrice"
                value={minPrice}
                onChange={handleInputChange}
              />
            </div>
            <div className="price-field">
              <span>Maximum Price</span>
              <input
                type="number"
                name="maxPrice"
                value={maxPrice}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="slider-container">
            <div className="price-slider"></div>
          </div>
        </div>
        <div className="range-input">
          <input
            type="range"
            className="min-range"
            min="0"
            max="500"
            value={minPrice}
            step="1"
            onChange={handleRangeChange}
            ref={minRangeRef}
          />
          <input
            type="range"
            className="max-range"
            min="0"
            max="1000"
            value={maxPrice}
            step="1"
            onChange={handleRangeChange}
            ref={maxRangeRef}
          />
        </div>
      </div>
      <div className="buttonInPriceSlider">
        <button className="okay-button" onClick={handleClose}>
          Okay
        </button>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
