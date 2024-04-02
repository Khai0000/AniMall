import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../ginkhai/slices/postSlice";
import forumHistorySlice from "../ginkhai/slices/forumHistorySlice";

export default configureStore({
  reducer: {
    posts: postSlice,
    forumHistory: forumHistorySlice,
  },
});
