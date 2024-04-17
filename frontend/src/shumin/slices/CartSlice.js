import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.findIndex(
        (item) => item.title === newItem.title
      );

      if (existingItemIndex !== -1) {
        // Item already exists, update its quantity
        state[existingItemIndex].quantity += newItem.quantity;
      } else {
        // Item is new, add it to the cart
        state.push(newItem);
      }
    },
    addServiceToCart: (state, action) => {
      const newService = action.payload;
      state.push(newService);
    },
    removeItemFromCart: (state, action) => {
      return state.filter((item)=>item.title!==action.payload);
    },
    updateQuantity: (state, action) => {
      const { title, quantity } = action.payload;
      const itemToUpdateIndex = state.findIndex((item) => item.title === title);

      if (itemToUpdateIndex !== -1) {
        state[itemToUpdateIndex].quantity = quantity;
      }
    },

    updateChecked: (state, action) => {
      const { title, checked } = action.payload;
      const itemToUpdate = state.find(item => item.title === title);
      
      if (itemToUpdate) {
        itemToUpdate.checked = checked;
      }
    },
    checkoutItems: (state, action) => {
      return state.filter((item) => !item.checked);
    },
  },
});

export const {
  addItemToCart,
  addServiceToCart,
  removeItemFromCart,
  updateQuantity,
  checkoutItems,
  updateChecked,
} = CartSlice.actions;

export default CartSlice.reducer;
