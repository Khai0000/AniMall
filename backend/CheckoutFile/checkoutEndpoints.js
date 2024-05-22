import express from "express";
import{
  getUserReceipts,
  getAllReceipts,
  createReceipt,
}from "./checkoutController.js";

const router = express.Router();

router.get("/user/receipts", getUserReceipts);

router.get("/admin/receipts", getAllReceipts);

router.post("/receipts", createReceipt);

export default router;