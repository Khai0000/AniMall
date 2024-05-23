import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    setCartItems: (state, action) => {
      return action.payload;
    },
    addItemToCart: (state, action) => {
      const newItem = action.payload[0]; // Extract the object from the array
    
      if (newItem && newItem.productId) {
        const existingItemIndex = state.findIndex(item => item.productId === newItem.productId);
    
        if (existingItemIndex !== -1) {
          // Item already exists, update its quantity
          state[existingItemIndex].quantity += newItem.quantity;
        } else {
          // Item is new, add it to the cart
          state.unshift(newItem);
        }
      } else {
        console.error('Invalid payload format:', action.payload);
      }
    },    
    addServiceToCart: (state, action) => {
      const newServices = action.payload;

      if (Array.isArray(newServices)) {
        newServices.forEach((newService) => {
          state.push(newService);
        });
      } else {
        state.push(newServices);
      }
    },
    removeItemFromCart: (state, action) => {
      const id = action.payload;
      return state.filter((item) => item._id !== id);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const itemToUpdateIndex = state.findIndex((item) => item._id === id);

      if (itemToUpdateIndex !== -1) {
        state[itemToUpdateIndex].quantity = quantity;
      }
    },

    updateChecked: (state, action) => {
      const { uniqueId, checked } = action.payload;
      const itemToUpdate = state.find((item) => item.uniqueId === uniqueId);

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
  setCartItems,
  addItemToCart,
  addServiceToCart,
  removeItemFromCart,
  updateQuantity,
  checkoutItems,
  updateChecked,
} = CartSlice.actions;

export default CartSlice.reducer;