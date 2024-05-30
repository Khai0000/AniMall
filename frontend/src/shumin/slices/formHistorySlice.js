import { createSlice } from "@reduxjs/toolkit";

export const formHistorySlice = createSlice({
  name: "form",
  initialState: {
        searchText: '',
        scrollPosition: 0,
  },
  reducers: {
    // addSelectedCategory: (state, action) => {
    //   state.selectedCategory.push(action.payload);
    // },
    // setSelectedCategory: (state, action) => {
    //   state.selectedCategory = action.payload;
    // },
    // removeSelectedCategory: (state, action) => {
    //   state.selectedCategory = state.selectedCategory.filter(
    //     (category) => category !== action.payload
    //   );
    // },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setScrollPosition: (state, action) => {
      state.scrollPosition = action.payload;
    },
    // setSelectedDate: (state, action) => {
    //   state.selectedDate = action.payload;
    // },
    setInitialPost: (state, action) => {
      return [...action.payload];
    },
    resetFormHistory: (state) => {
      //state.selectedCategory = [];
      state.searchText = "";
      state.scrollPosition = null;
      //state.selectedDate = null;
    },
    removePost: (state, action) => {
      return state.filter((form) => form._id !== action.payload);
    },
  },
});

export const {
  // addSelectedCategory,
  // removeSelectedCategory,
  // setSelectedCategory,
  setSearchText,
  setScrollPosition,
  setInitialPost,
  resetFormHistory,
  removePost,
} = formHistorySlice.actions;

export default formHistorySlice.reducer;
