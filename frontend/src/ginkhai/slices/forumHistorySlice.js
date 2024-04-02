import { createSlice } from "@reduxjs/toolkit";

export const forumHistorySlice = createSlice({
  name: "forumHistory",
  initialState: {
    selectedCategory: [],
    searchText: "",
    scrollPosition: null,
    selectedDate: null,
  },
  reducers: {
    addSelectedCategory: (state, action) => {
      state.selectedCategory.push(action.payload);
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    removeSelectedCategory: (state, action) => {
      state.selectedCategory = state.selectedCategory.filter(
        (category) => category !== action.payload
      );
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setScrollPosition: (state, action) => {
      state.scrollPosition = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    resetForumHistory: (state) => {
      state.selectedCategory = [];
      state.searchText = "";
      state.scrollPosition = null;
      state.selectedDate = null;
    },
  },
});

export const {
  addSelectedCategory,
  removeSelectedCategory,
  setSelectedCategory,
  setSearchText,
  setScrollPosition,
  setSelectedDate,
  resetForumHistory,
} = forumHistorySlice.actions;

export default forumHistorySlice.reducer;
