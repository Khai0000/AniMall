import { createSlice } from "@reduxjs/toolkit";

export const ProductSlice =createSlice({
    name: "product",
    initialState:[],
    reducers:{
        setInitialProduct(state, action) {
          return [...action.payload];
        },
        addProduct(state, action) {
          const newProduct = action.payload;
          let isDuplicate = false;
          for (const product of state) {
            if (product._id === newProduct._id) {
              isDuplicate = true;
              break;
            }
          }
          if (!isDuplicate) {
            return [newProduct,...state];
          }
        }, 
        removeProduct(state,action){
            return state.filter((product)=>product._id!==action.payload);
        },
        editProduct(state, action) {
          const { id, ...updates } = action.payload; 
          const existingProductIndex = state.findIndex(product => product._id === id);
      
          if (existingProductIndex !== -1) {
              const updatedState = [...state];
              updatedState[existingProductIndex] = {
                  ...updatedState[existingProductIndex],
                  ...updates, 
              };
              return updatedState; 
          }
      
          return state;
        },
        hideProduct(state,action){
            const {id}=action.payload;
            const existingProduct= state.find(product=>product._id===id);
            if(existingProduct){
                existingProduct.hidden=true;
            }
        },
        addToCart (state, action) {
            const { id, quantity } = action.payload;
            const existingProduct = state.find(product => product._id === id);
            if (existingProduct) {
              existingProduct.quantityInCart += quantity;
            }
        },
        addComment: (state, action) => {
          const { id, comment } = action.payload;
          const product = state.find(
            (product) => product._id === id
          );
          if (product) {
            product.comments.unshift(comment);
          }
        },
        removeComment: (state, action) => {
          const { id, commentId } = action.payload;
          const productIndex = state.findIndex(product => product._id === id);
        
          if (productIndex !== -1) {
            state[productIndex] = {
              ...state[productIndex],
              comments: state[productIndex].comments.filter(comment => comment._id !== commentId),
            };
          }
        },        
        addRating(state, action) {
          const { id, rating } = action.payload;
          const product = state.find(
            (product) => product._id === id
          );
          if (product) {
            // Update the total ratings count and specific rating count
            product.ratings.total++;
            product.ratings[rating]++;
          }    
        },
        checkOutProduct(state,action){
            const { id, quantity } = action.payload;
            const existingProduct = state.find(product => product._id === id);
            if (existingProduct) {
              existingProduct.stockLevel -= quantity;
            }
        },
        updateQuantity(state, action) {
          const { id, quantity } = action.payload;
          const existingProduct = state.find((product) => product._id === id);
          if (existingProduct) {
            existingProduct.stockLevel = quantity;
          }
        },
      },
    });

export const {
    setInitialProduct,
    addProduct,
    removeProduct,
    editProduct,
    setProductQuantity,
    hideProduct,
    addToCart,
    addComment,
    addRating,
    removeComment,
    checkOutProduct,
    updateQuantity
  } = ProductSlice.actions;
  export default ProductSlice.reducer;