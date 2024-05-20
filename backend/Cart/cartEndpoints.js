import express from "express";
import {
    addToCart,
    removeFromCart,
    getCart
  } from "./cartController.js";


const router = express.Router();

router.post('/:userId/add', addToCart);

router.delete('/:userId/remove/:itemId', removeFromCart);

router.get('/:userId', getCart);

export default router;