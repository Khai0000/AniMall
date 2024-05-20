import express from "express";
import {
  getUserReceipts,
  getAllReceipts,
  getReceiptById,
  createReceipt,
  deleteReceiptById
} from "./checkoutController";

const router = express.Router();

router.get("/user/receipts", getUserReceipts);

router.get("/admin/receipts", getAllReceipts);

router.get("/receipts/:receiptId", getReceiptById);

router.post("/receipts", createReceipt);

router.delete("/receipts/:receiptId", deleteReceiptById);

export default router;
