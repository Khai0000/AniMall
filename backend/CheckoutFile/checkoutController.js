  import {CheckoutModel} from "./checkoutModel.js";
  import { v4 as uuidv4 } from 'uuid';
  import mongoose from "mongoose";


  export const getUserReceipts = async (req, res) => {
    try {
      const userId = req.body.userId;
      const userReceipts = await CheckoutModel.find({ userId });

      res.json(userReceipts);
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
      const { userId, username, email, address, products, totalPrice } = req.body;

      const receiptId = uuidv4();
      const userObjectId = new mongoose.Types.ObjectId(userId);

      const newReceipt = {
        products,
        totalPrice
      };

      let checkoutDocument = await CheckoutModel.findOne({ userId });

      if (checkoutDocument) {
        checkoutDocument.receipts.push(newReceipt);
      } else {
        checkoutDocument = new CheckoutModel({
          userId: userObjectId,
          username,
          email,
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
