import mongoose from "mongoose";

const checkoutSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true
    },
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", 
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        type: {
          type: String,
          required: true
        }
      }
    ],
    totalPrice: {
      type: Number,
      required: true
    },
    receiptId: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

export const CheckoutModel = mongoose.model(
  "Checkout",
  checkoutSchema
);
