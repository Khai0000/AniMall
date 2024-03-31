import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: [],
  reducers: {
    addPost: (state, action) => {
      return [action.payload, ...state];
    },
    removePost: (state, action) => {
      return state.filter((post) => post === action.payload);
    },
    setInitialPost: (state, action) => {
      return [...action.payload];
    },
  },
});

export const { addPost, removePost, setInitialPost, logPost } =
  postSlice.actions;
export default postSlice.reducer;
