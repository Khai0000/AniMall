import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "../shumin/slices/ProductSlice";
import PetSlice from "../shumin/slices/PetSlice";
import CartSlice from "../shumin/slices/CartSlice";
import postSlice from "../ginkhai/slices/postSlice";
import forumHistorySlice from "../ginkhai/slices/forumHistorySlice";
import serviceSlice from "../ZongMing/slices/serviceSlice";
import orderSlice from "../ZongMing/slices/orderSlice";
import userSlice from "../shuhui/slices/userSlice";


export default configureStore({
  reducer: {
    user:userSlice,
    posts: postSlice,
    forumHistory: forumHistorySlice,
    products: ProductSlice,
    pets:PetSlice,
    cart:CartSlice,
    services: serviceSlice,
    orders:orderSlice,
  },
});

