import "../styles/ForumHomeHeader.css";
import SearchIcon from "@mui/icons-material/Search";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedCategory,
  setSearchText,
  setSelectedDate,
} from "../slices/forumHistorySlice";

const ForumHomeHeader = () => {
  const dispatch = useDispatch();
  const forumHistory = useSelector((state) => state.forumHistory);
  const { selectedCategory, searchText, selectedDate } = forumHistory;

  const toggleButton = (button) => {
    const updatedCategories = selectedCategory.includes(button)
      ? selectedCategory.filter((category) => category !== button)
      : [...selectedCategory, button];

    dispatch(setSelectedCategory(updatedCategories));
  };

  const handleOnTextChange = (e) => {
    dispatch(setSearchText(e.target.value));
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

        <button
          className={`datePickerButton ${
            selectedDate ? "dateButtonSelected" : ""
          }`}
        >
          <Datepicker
            className="datePicker"
            selected={selectedDate ? selectedDate : new Date()}
            onChange={(date) => {
              dispatch(setSelectedDate(date));
            }}
            dateFormat="dd/M/yyyy"
            isClearable={selectedDate ? true : false}
          />
        </button>
      </div>
    </div>
  );
};

export default ForumHomeHeader;
