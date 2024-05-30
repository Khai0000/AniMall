import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "../shumin/slices/ProductSlice";
import PetSlice from "../shumin/slices/PetSlice";
import CartSlice from "../shumin/slices/CartSlice";
import postSlice from "../ginkhai/slices/postSlice";
import forumHistorySlice from "../ginkhai/slices/forumHistorySlice";
import serviceSlice from "../ZongMing/slices/serviceSlice";
import userSlice from "../shuhui/slices/userSlice";
import formHistorySlice from "../shumin/slices/formHistorySlice";

export default configureStore({
  reducer: {
    user:userSlice,
    posts: postSlice,
    forumHistory: forumHistorySlice,
    products: ProductSlice,
    pets:PetSlice,
    cart:CartSlice,
    services: serviceSlice,
    form: formHistorySlice,
  },
});

