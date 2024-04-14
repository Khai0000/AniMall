import { createSlice } from "@reduxjs/toolkit";

// template for a cart{
//     items:[],
// }

const initialState={
    items:[],
    totalItems:0,
    totalPrice:0,
};

export const CartSlice=createSlice({
    name:"cart",
    initialState:[],
    reducer:{
        addItemToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find((cartItem) => cartItem.id === item.id);
      
            if (existingItem) {
              existingItem.quantity += item.quantity || 1;
            } else {
              state.items.push(item);
            }
      
            state.totalItems += item.quantity || 1;
            state.totalPrice += item.price * (item.quantity || 1);
          },
          removeItemFromCart: (state, action) => {
            const idToRemove = action.payload;
            const existingItem = state.items.find((cartItem) => cartItem.id === idToRemove);
      
            if (existingItem) {
              state.totalItems -= existingItem.quantity || 1;
              state.totalPrice -= existingItem.price * (existingItem.quantity || 1);
              state.items = state.items.filter((cartItem) => cartItem.id !== idToRemove);
            }
          },
    },
});
      
export const { addItemToCart, removeItemFromCart} = CartSlice.actions;
      
export default CartSlice.reducer;