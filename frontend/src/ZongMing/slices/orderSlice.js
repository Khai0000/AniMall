import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    order: [],
    selectedCategory: [],
  },
  reducers: {
    setInitialOrders(state, action) {
      state.order = action.payload;  
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    addSelectedCategory: (state, action) => {
      state.selectedCategory.push(action.payload);
    },
    removeSelectedCategory: (state, action) => {
      state.selectedCategory = state.selectedCategory.filter(
        (category) => category !== action.payload
      );
    },
  },
});

export const {
  setInitialOrders,
  setSelectedCategory,
  addSelectedCategory,
  removeSelectedCategory,
} = orderSlice.actions;

export default orderSlice.reducer;
