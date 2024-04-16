import { createSlice } from "@reduxjs/toolkit";

// template for a cart
//   {
//     "items": [
//       {
//         id: "P0041",
        // title: "Dog Travel Water Bottle",
        // description: "Portable water bottle with a built-in bowl for dogs, perfect for walks, hikes, and travel.",
        // image: ["dogAccessory6.jpg"],
        // animaltag: ["dog"],
        // producttag: ["accessory"],
        // price: 22.99,
        // ratings: {
        //     total: 61,
        //     1: 1,
        //     2: 1,
        //     3: 17,
        //     4: 22,
        //     5: 20,
        // },
        // comments: [
        //     { name: "Ethan Wilson", comment: "Very convenient for keeping my dog hydrated on walks." },
        //     { name: "Avery Martinez", comment: "Sturdy and leak-proof. Great for outdoor adventures with my dog." }
        // ],
        // stockLevel: 80,
        // hidden: false,
        // type: "product",
        // quantity: 1,
        // checked: true,
//       },
//       {
//         id: "A0008",
        // title: "Coco Parrot",
        // description: "Curious parrot, mimics voices",
        // image:["others4.jpg"],
        // birthdate: "7/22/2022",
        // animaltag: ["others"],
        // price: 45.00,
        // stockLevel:1,
        // hidden: false
        // type: "pet"
        // quantity: 1,
        // checked: true,
//       },
//       {
//         serviceTitle: "Fitness Training",
      // serviceImages: [dog6,dog2],
      // description: "Get fit with our personalized fitness training sessions",
      // price: "40",
      // ratings: {
      //   total: 20,
      //   1: 2,
      //   2: 3,
      //   3: 4,
      //   4: 6,
      //   5: 5,
      // },
      // comments: [
      //   { name: "Jake", content: "Really pushed me to my limits, but worth it!" },
      //   { name: "Hannah", content: "Excellent trainers and facilities." },
      // ],
      // createdAt: "2024-04-08T16:45:00.000Z",
      // type: "service"
      // quantity: 1,
      // checked: true,
//       }
//     ],
//     "totalItems": 3,
//     "totalPrice": 1619.99
//   }


export const CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.findIndex(item => item.title === newItem.title);
      
      if (existingItemIndex !== -1) {
        // Item already exists, update its quantity
        state[existingItemIndex].quantity += newItem.quantity;
      } else {
        // Item is new, add it to the cart
        state.push(newItem);
      }
    },
    removeItemFromCart: (state, action) => {
      return state.filter((item)=>item.title!==action.payload);
    },
    updateQuantity: (state, action) => {
      const { title, quantity } = action.payload;
      const itemToUpdateIndex = state.findIndex(item => item.title === title);
      
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
      
      return state.filter(item => !item.checked);
    },
  },
});

      
export const { addItemToCart, removeItemFromCart, updateQuantity, checkoutItems, updateChecked} = CartSlice.actions;
      
export default CartSlice.reducer;