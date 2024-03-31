import { useState} from "react";
import "../styles/ForumHomeHeader.css";
import SearchIcon from "@mui/icons-material/Search";

const ForumHomeHeader = ({ selectedCategory, setSelectedCategory,searchText,setSearchText }) => {
  const [selectedButtons, setSelectedButtons] = useState([]);

  const toggleButton = (button) => {
    const updatedCategories = selectedCategory.includes(button)
      ? selectedCategory.filter((category) => category !== button)
      : [...selectedCategory, button];

    setSelectedCategory(updatedCategories);

  };

  const handleOnTextChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="forumFilterContainer">
      <div className="inputContainer">
        <input
          type="text"
          placeholder="Search for a discussion..."
          onChange={handleOnTextChange}
          value={searchText}
        />
        <SearchIcon className="searchIcon" />
      </div>
      <div className="forumButtonContainer">
        <button
          className={selectedCategory.includes("cat") ? "selected" : ""}
          onClick={() => toggleButton("cat")}
        >
          Cat
        </button>
        <button
          className={selectedCategory.includes("dog") ? "selected" : ""}
          onClick={() => toggleButton("dog")}
        >
          Dog
        </button>
        <button
          className={selectedCategory.includes("others") ? "selected" : ""}
          onClick={() => toggleButton("others")}
        >
          Others
        </button>

        <button
          className={selectedButtons.includes("others") ? "selected" : ""}
          onClick={() => toggleButton("others")}
        >
          Others
        </button>
      </div>
    </div>
  );
};

export default ForumHomeHeader;
