import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../ginkhai/slices/postSlice";

export default configureStore({
  reducer: {
    posts: postSlice,
  },
});
