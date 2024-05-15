import { createSlice } from "@reduxjs/toolkit";

// template for a pet{
//     id: A0001,
//     title: "jinmao"
//     description:"very cute ",
//     birth date: 6/3/2024,
//     image:["dog1"],
//     animaltag:["dog","cat","others"],
//     price:25.00,
//     hidden:false,
// }

export const PetSlice =createSlice({
    name: "pet",
    initialState:[],
    reducers:{
        setInitialPet(state, action) {
          state.pets = action.payload.filter(pet => !pet.hidden);
        },
        addPet(state, action) {
          const newPet = action.payload;
          let isDuplicate = false;
          for (const pet of state) {
            if (pet.id === newPet.id) {
              isDuplicate = true;
              break;
            }
          }
          if (!isDuplicate) {
            return [...state,newPet];
          }
        }, 
        removePet(state,action){
            return state.filter((pet)=>pet.id!==action.payload);
        },
        editPet(state, action) {
          const { id, ...updates } = action.payload; 
          const existingPetIndex = state.findIndex(pet => pet.id === id);
      
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
        setPetQuantity(state,action){
            const {id,stockLevel}=action.payload;
            const existingPet= state.find(pet=>pet.id===id);
            if(existingPet){
                existingPet.stockLevel=stockLevel;
            }
        },
        hidePet(state,action){
            const {id}=action.payload;
            const existingPet= state.find(pet=>pet.id===id);
            if(existingPet){
                existingPet.hidden=true;
            }
        },
        checkOutPet(state,action){
            const { id, quantity } = action.payload;
            const existingPet = state.find(pet => pet.id === id);
            if (existingPet) {
              existingPet.stockLevel -= quantity;
            }
        }
    }
})

export const {
    setInitialPet,
    addPet,
    removePet,
    editPet,
    setPetQuantity,
    hidePet,
    checkOutPet
  } = PetSlice.actions;
  export default PetSlice.reducer;