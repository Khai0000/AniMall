import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        title: {
          type: String,
          require: true,
        },
        price: {
          type: Number,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        quantity: {
          type: String,
          required: false,
        },
        date: {
          type: String,
          required: false,
        },
        slot: {
          type: String,
          required: false,
        },
        image: {
          type: String,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const checkoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone:{
      type: Number,
      required:true,
    },
    receipts: [receiptSchema],
  },
  { timestamps: true }
);

export const CheckoutModel = mongoose.model("Checkout", checkoutSchema);
