import {createSlice} from "@reduxjs/toolkit";

export const ProductHistorySlice=createSlice({
    name:"productHistory",
    initialState:{
        searchText: "",
        scrollPosition: null,
        minPriceRange:null,
        maxPriceRange:null,
        selectedProductType:null,
    },
    reducers:{
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        },
        setScrollPosition: (state, action) => {
            state.scrollPosition = action.payload;
        },
        setMinPrice:(state,action)=>{
            state.minPriceRange=action.payload;
        },
        setMaxPrice:(state,action)=>{
            state.maxPriceRange=action.payload;
        },
        setSelectedProduct:(state,action)=>{
            state.selectedProductType=action.payload;
        },
        resetProductPage:(state)=>{
            state.searchText= "";
            state.scrollPosition= null;
            state.minPrice=null;
            state.maxPrice=null;
            state.selectedProductType=null;
        },
    },
});

export const{
    setSearchText,
    setScrollPosition,
    setMinPrice,
    setMaxPrice,
    setSelectedProduct,
    resetProductPage
}=ProductHistorySlice.actions;

export default ProductHistorySlice.reducer;
