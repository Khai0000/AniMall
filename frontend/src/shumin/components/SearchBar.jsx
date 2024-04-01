import React, { useState } from 'react';
import "../styles/ProductHome.css"
import SearchIcon from './SearchButton';

const SearchBar = ({ showPriceRange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isFocused,setIsFocused]=useState(false);

  const handleSearch = () => {
    setSearchResults([{ id: 1, title: `Search results for: "${searchTerm}"` }]);
  };

  return (
    <div className={`Upper-section-search-container ${isFocused ? 'focused' : ''} ${showPriceRange ? 'show-price-range' : ''}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        tabIndex="0"> {/* Make div focusable */}
        <input type="text" className="Upper-section-search-input" />
        <button type="submit" className="Upper-section-search-button">
            <SearchIcon className="Upper-section-search-icon" focused={isFocused} />
        </button>
    </div>
  );
};

export default SearchBar;
