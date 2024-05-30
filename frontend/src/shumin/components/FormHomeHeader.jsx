import "../styles/FormHomeHeader.css";
import SearchIcon from "@mui/icons-material/Search";
// import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchText,
} from "../slices/formHistorySlice";
import { useState } from "react";

const FormHomeHeader = () => {
  const dispatch = useDispatch();
  const formHistory = useSelector((state) => state.formHistory) || {};
  const {
    //selectedCategory = [],
    searchText = '',
    //selectedDate = null
  } = formHistory;
  const [isHovered, setIsHovered] = useState(false);

  // const toggleButton = (button) => {
  //   const updatedCategories = selectedCategory.includes(button)
  //     ? selectedCategory.filter((category) => category !== button)
  //     : [...selectedCategory, button];

  //   dispatch(setSelectedCategory(updatedCategories));
  // };

  const handleOnTextChange = (e) => {
    dispatch(setSearchText(e.target.value));
  };

  return (
    <div className="formFilterContainer">
      <div
        className="inputContainer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <input
          id="searchBar"
          type="text"
          placeholder="Search for a adoption..."
          onChange={handleOnTextChange}
          value={searchText}
        />
        <SearchIcon className={`searchIcon ${isHovered ? "focusedIcon" : ""}`} />
      </div>
      {/* <div className="formButtonContainer"> */}
        {/* <button
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
        </button> */}

        {/* <button
          className={`datePickerButton ${
            selectedDate ? "dateButtonSelected" : ""
          }`}
        >
          <Datepicker
            className="datePicker"
            selected={selectedDate}
            onChange={(date) => {
              dispatch(setSelectedDate(date));
            }}
            dateFormat="dd/M/yyyy"
            isClearable={true}
          />
        </button> */}
      {/* </div> */}
    </div>
  );
};

export default FormHomeHeader;
