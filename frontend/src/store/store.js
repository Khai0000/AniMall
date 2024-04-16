import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "../shumin/slices/ProductSlice";
import PetSlice from "../shumin/slices/PetSlice";
import CartSlice from "../shumin/slices/CartSlice";
import postSlice from "../ginkhai/slices/postSlice";
import forumHistorySlice from "../ginkhai/slices/forumHistorySlice";
import serviceSlice from "../ZongMing/slices/serviceSlice";


export default configureStore({
  reducer: {
    posts: postSlice,
    forumHistory: forumHistorySlice,
    products: ProductSlice,
    pets:PetSlice,
    cart:CartSlice,
    services: serviceSlice,

  },
});

