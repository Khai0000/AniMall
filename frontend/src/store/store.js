import { configureStore } from "@reduxjs/toolkit";
import serviceSlice from "../ZongMing/slices/serviceSlice";

export default configureStore({
  reducer: {
    services: serviceSlice,
  },
});