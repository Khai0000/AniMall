import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    searchText:"",
  },
  reducers: {
    setInitialPost: (state, action) => {
      return action.payload;
    },
    addPost: (state, action) => {
      state.push(action.payload);
    },
    removePost: (state, action) => {
      return state.filter(post => post._id !== action.payload);
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    updatePost: (state, action) => {
      const index = state.findIndex(post => post._id === action.payload._id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { setInitialPost, addPost, removePost,searchText, updatePost } = formSlice.actions;

export default formSlice.reducer;
