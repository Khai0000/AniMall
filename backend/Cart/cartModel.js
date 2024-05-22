import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    username:{
      type: String,
      required:true,
    },
    email:{
      type: String,
      required:true,
    },
    address:{
      type: String,
    },
    phone:{
      type: String,
    },
    userUid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "items.type", 
          required: true,
        },
        title:{
          type: String,
          required: true,
        },
        slot:{
          type: String,
          default:"",
        },
        image:{
          type: [String],
          required: true,
        },
        quantity: {
          type: Number,
          default:0,
        },
        price: {
          type: Number,
          required: true,
        },
        type: {
          type: String,
          required: true,
          enum: ['Product', 'ServiceItem'], 
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Cart = mongoose.model("Cart", cartSchema);