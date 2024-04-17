import React from 'react';
import "../styles/ProductHome.css"
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({  onSearch,placeholder}) => {

  const handleSearchInputChange = (e) => {
    onSearch(e.target.value); 
  };

  return (
    <div className="inputContainer">
        <input
          className="searchBar"
          type="text"
          placeholder={placeholder}
          onChange={handleSearchInputChange}
        />
        <SearchIcon className="searchIcon"/>
    </div>
  );
};


export default SearchBar;
