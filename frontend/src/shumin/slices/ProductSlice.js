import { createSlice } from "@reduxjs/toolkit";

// template for a product{
//     id: 100033,
//     title: "Friskies cat food"
//     description:"Friskies is known for its variety of flavors and textures designed to appeal to cats' preferences. The brand focuses on providing nutritionally balanced meals for cats of all ages, from kittens to adult cats. Friskies products often include proteins, vitamins, and minerals essential for a cat's health and well-being.",
//     image:["catFood1"],
//     animaltag:["dog","cat","others"],
//     producttag:["food","accessories"],
//     price:25.00,
//     ratings: {
//        total: 61,
//        1: 0,
//        2: 1,
//        3: 5,
//        4: 50,
//        5: 5,
//     },
//     comments:[
//         {    
//             name:"Ali",
//             content:"good product!"
//         },
//         {
//             name:"Ahmad",
//             content:"Nicelah!"
//         },
//     ],
//     stockLevel:500,
//     hidden:false,
//
// }

const initialState={
    products:[],//array to hold all products
    selectedProduct:null,  //hold details of the selected product
    selectedCategory:[],
    searchText:"",
};

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
            if (product.id === newProduct.id) {
              isDuplicate = true;
              break;
            }
          }
          if (!isDuplicate) {
            return [...state,newProduct];
          }
        }, 
        removeProduct(state,action){
            return state.filter((product)=>product.id!==action.payload);
        },
        editProduct(state, action) {
          const { id, ...updates } = action.payload; 
          const existingProductIndex = state.findIndex(product => product.id === id);
      
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
            const {id,hidden}=action.payload;
            const existingProduct= state.find(product=>product.id===id);
            if(existingProduct){
                existingProduct.hidden=true;
            }
        },
        addToCart (state, action) {
            const { id, quantity } = action.payload;
            const existingProduct = state.find(product => product.id === id);
            if (existingProduct) {
              existingProduct.quantityInCart += quantity;
            }
        },
        addComment(state, action) {
            const { title, comment } = action.payload;
            const existingProduct = state.find(product => product.title === title);
            if (existingProduct) {
              existingProduct.comments.push(comment);
            }
        },
        giveRating(state, action) {
          const { title, rating } = action.payload;
          const product = state.find(
            (product) => product.title === title
          );
          if (product) {
            // Update the total ratings count and specific rating count
            product.ratings.total++;
            product.ratings[rating]++;
          }    
        },
        removeComment(state, action) {
            const { id, commentId } = action.payload;
            const existingProduct = state.find(product => product.id === id);
            if (existingProduct) {
              existingProduct.comments = existingProduct.comments.filter(comment => comment.id !== commentId);
            }
        },
        checkOutProduct(state,action){
            const { id, quantity } = action.payload;
            const existingProduct = state.find(product => product.id === id);
            if (existingProduct) {
              existingProduct.stockLevel -= quantity;
            }
        }
    }
})

export const {
    setInitialProduct,
    addProduct,
    removeProduct,
    editProduct,
    setProductQuantity,
    hideProduct,
    addToCart,
    addComment,
    giveRating,
    removeComment,
    checkOutProduct,
  } = ProductSlice.actions;
  export default ProductSlice.reducer;