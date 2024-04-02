import "../styles/ForumHomeHeader.css";
import SearchIcon from "@mui/icons-material/Search";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ForumHomeHeader = ({
  selectedCategory,
  setSelectedCategory,
  searchText,
  setSearchText,
  selectedDate,
  setSelectedDate,
}) => {
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
          className="searchBar"
          type="text"
          placeholder="Search for a discussion..."
          onChange={handleOnTextChange}
          value={searchText}
        />
        <SearchIcon className="searchIcon" />
      </div>
      <div className="forumButtonContainer">
        <button
          className={`categoryButton ${
            selectedCategory.includes("cat") ? "selected" : ""
          }`}
          onClick={() => toggleButton("cat")}
        >
          Cat
        </button>
        <button
          className={`categoryButton ${
            selectedCategory.includes("dog") ? "selected" : ""
          }`}
          onClick={() => toggleButton("dog")}
        >
          Dog
        </button>
        <button
          className={`categoryButton ${
            selectedCategory.includes("others") ? "selected" : ""
          }`}
          onClick={() => toggleButton("others")}
        >
          Others
        </button>

        <button className={`datePickerButton ${selectedDate?"dateButtonSelected":""}`}>
          <Datepicker
            className="datePicker"
            selected={selectedDate? selectedDate:new Date()}
            onChange={(date) => {
              console.log("Date:",date);
              setSelectedDate(date);
            }}
            dateFormat="dd/M/yyyy"
            isClearable={selectedDate&&true}
          />
        </button>
      </div>
    </div>
  );
};

export default ForumHomeHeader;
