import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    username:{
      type: String,
      required:true,
    },
    userId: {
      type: String,
      required: true,
    },
    items: [
      {
        productId: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        slot: {
          type: String,
          required: false,
        },
        image: {
          type: [String],
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1, 
          required:true,
        },
        type: {
          type: String,
          required: true,
        },
        date: {
          type: Date, 
          required: false,
        },
        checked: {
          type: Boolean,
          default: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Cart = mongoose.model("Cart", cartSchema);