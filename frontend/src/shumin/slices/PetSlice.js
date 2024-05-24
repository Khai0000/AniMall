import { createSlice } from "@reduxjs/toolkit";

export const PetSlice = createSlice({
  name: "pet",
  initialState: [],
  reducers: {
    setInitialPet(state, action) {
      return [...action.payload];
    },
    addPet(state, action) {
      const newPet = action.payload;
      let isDuplicate = false;
      for (const pet of state) {
        if (pet._id === newPet._id) {
          isDuplicate = true;
          break;
        }
      }
      if (!isDuplicate) {
        return [...state, newPet];
      }
    },
    removePet(state, action) {
      return state.filter((pet) => pet._id !== action.payload);
    },
    editPet(state, action) {
      const { id, ...updates } = action.payload;
      const existingPetIndex = state.findIndex((pet) => pet._id === id);

      if (existingPetIndex !== -1) {
        const updatedState = [...state];
        updatedState[existingPetIndex] = {
          ...updatedState[existingPetIndex],
          ...updates,
        };
        return updatedState;
      }

      return state;
    },
    setPetQuantity(state, action) {
      const { id, stockLevel } = action.payload;
      const existingPet = state.find((pet) => pet._id === id);
      if (existingPet) {
        existingPet.stockLevel = stockLevel;
      }
    },
    hidePet(state, action) {
      const { id } = action.payload;
      const existingPet = state.find((pet) => pet._id === id);
      if (existingPet) {
        existingPet.hidden = true;
      }
    },
    addToCart(state, action) {
      const { id, quantity } = action.payload;
      const existingPet = state.find((pet) => pet._id === id);
      if (existingPet) {
        existingPet.quantityInCart += quantity;
      }
    },
    checkOutPet(state, action) {
      const { id, quantity } = action.payload;
      const existingPet = state.find((pet) => pet._id === id);
      if (existingPet) {
        existingPet.stockLevel -= quantity;
      }
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingPet = state.find((pet) => pet._id === id);
      if (existingPet) {
        existingPet.stockLevel = quantity;
      }
    },
  },
});

export const {
  setInitialPet,
  addPet,
  removePet,
  editPet,
  setPetQuantity,
  hidePet,
  addToCart,
  checkOutPet,
  updateQuantity,
} = PetSlice.actions;
export default PetSlice.reducer;
