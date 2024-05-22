import express from "express";
import {
    addToCart,
    removeFromCart,
    getCart,
    updateCart
  } from "./cartController.js";


const router = express.Router();

router.post('/add', addToCart);

router.delete('/remove/:userId/:itemIdDeId', removeFromCart);

router.get('/:userId', getCart);

router.put('/update',updateCart);

export default router;