import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema({
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
      },
      quantity: {
        type: Number,
        required: true
      },
    }
  ],
  totalPrice: {
    type: Number,
    required: true
  }
});

const checkoutSchema = new mongoose.Schema(
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
    receipts: [receiptSchema]
  },
  { timestamps: true }
);

export const CheckoutModel = mongoose.model("Checkout", checkoutSchema);
