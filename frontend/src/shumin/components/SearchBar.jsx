import React, { useState } from 'react';
import "../styles/ProductHome.css"
import SearchIcon from './SearchIcon';

const SearchBar = ({ showPriceRange, onSearch ,page}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSearchInputChange = (e) => {
    onSearch(e.target.value); 
  };

  return (
    <div className={`Upper-section-search-container ${isFocused ? 'focused' : ''} ${showPriceRange ? 'show-price-range' : ''} ${page=="pet"?'pet':'product'}`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex="0"> 
      <input
        type="text"
        className="Upper-section-search-input"
        onChange={handleSearchInputChange}
      />
      <button
        type="button"
        className="Upper-section-search-button"
        onClick={handleSearchInputChange}
      >
        <SearchIcon focused={isFocused} hover={isHovered}/>
      </button>
    </div>
  );
};


export default SearchBar;
