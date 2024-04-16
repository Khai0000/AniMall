import { configureStore } from "@reduxjs/toolkit";
// import postSlice from "../ginkhai/slices/postSlice";
// import forumHistorySlice from "../ginkhai/slices/forumHistorySlice";
import ProductSlice from "../shumin/slices/ProductSlice";
import PetSlice from "../shumin/slices/PetSlice";
import CartSlice from "../shumin/slices/CartSlice";

export default configureStore({
  reducer: {
    // posts: postSlice,
    // forumHistory: forumHistorySlice,
    products: ProductSlice,
    pets:PetSlice,
    cart:CartSlice,
  },
});