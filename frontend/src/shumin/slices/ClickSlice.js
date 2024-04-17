// slices/ClickSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const clickSlice = createSlice({
  name: 'clicks',
  initialState: {
    count: 0,
  },
  reducers: {
    increment: state => {
      state.count += 1;
    },
    reset: state => {
      state.count = 0;
    },
  },
});

export const { increment, reset } = clickSlice.actions;

export const selectClickCount = state => state.clicks.count;

export default clickSlice.reducer;
