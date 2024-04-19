import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userState",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    updateUser: (state, action) => {
      // Update user data based on the action payload
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { setUser, removeUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
