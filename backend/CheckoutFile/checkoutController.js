import { CheckoutModel } from "./checkoutModel";

export const getUserReceipts = async (req, res) => {
  try {
    const userId = req.user.id;
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

export const getReceiptById = async (req, res) => {
  try {
    const { receiptId } = req.params;

    const receipt = await CheckoutModel.findById(receiptId);

    if (!receipt) {
      return res.status(404).json({ message: "Receipt not found" });
    }

    res.json(receipt);
  } catch (error) {
    console.error("Error fetching receipt by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createReceipt = async (req, res) => {
  try {
    const { userId, username, email, address, products, totalPrice, receiptId } = req.body;

    const newReceipt = new CheckoutModel({
      userId,
      username,
      email,
      address,
      products,
      totalPrice,
      receiptId
    });

    await newReceipt.save();

    res.status(201).json(newReceipt);
  } catch (error) {
    console.error("Error creating new receipt:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteReceiptById = async (req, res) => {
  try {
    const { receiptId } = req.params;

    const deletedReceipt = await CheckoutModel.findByIdAndDelete(receiptId);

    if (!deletedReceipt) {
      return res.status(404).json({ message: "Receipt not found" });
    }

    res.json({ message: "Receipt deleted successfully" });
  } catch (error) {
    console.error("Error deleting receipt by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};
