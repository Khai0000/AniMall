import {CheckoutModel} from "./checkoutModel.js";
import mongoose from "mongoose";


export const getUserReceipts = async (req, res) => {
  try {
    const userId = req.query.userId;
    const userReceipts = await CheckoutModel.find({ userId });

    return res.status(200).json(userReceipts);
  } catch (error) {
    console.error("Error fetching user's receipts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllReceipts = async (req, res) => {
  try {
    const allReceipts = await CheckoutModel.find();

    res.json(allReceipts);
  } catch (error) {
    console.error("Error fetching all receipts:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const createReceipt = async (req, res) => {
  try {
    const { userId, username, email, address, phone, products, totalPrice } = req.body;
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const newReceipt = {
      products,
      totalPrice
    };

    let checkoutDocument = await CheckoutModel.findOne({ userId });

    if (checkoutDocument) {
      checkoutDocument.receipts.unshift(newReceipt);
    } else {
      checkoutDocument = new CheckoutModel({
        userId: userObjectId,
        username,
        email,
        phone,
        address,
        receipts: [newReceipt]
      });
    }

    await checkoutDocument.save();

    res.status(201).json(checkoutDocument);
  } catch (error) {
    console.error("Error creating new receipt:", error);
    res.status(500).json({ message: "Server error" });
  }
};
