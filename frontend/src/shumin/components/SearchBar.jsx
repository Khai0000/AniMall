import React, { useState } from 'react';
import "../styles/ProductHome.css"
import SearchIcon from './SearchButton';

const SearchBar = ({ showPriceRange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isFocused,setIsFocused]=useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSearch = () => {
    setSearchResults([{ id: 1, title: `Search results for: "${searchTerm}"` }]);
  };

  return (
    <div className={`Upper-section-search-container ${isFocused ? 'focused' : ''} ${showPriceRange ? 'show-price-range' : ''}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        tabIndex="0"> {/* Make div focusable */}
        <input type="text" className="Upper-section-search-input" />
        <button type="submit" className="Upper-section-search-button">
            <SearchIcon focused={isFocused} hover={isHovered} />
        </button>
    </div>
  );
};

export default SearchBar;
