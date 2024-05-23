import express from "express";
import {
    addToCart,
    removeFromCart,
    getCart,
    updateCartChecked,
    updateCartQuantity
  } from "./cartController.js";


const router = express.Router();

router.post('/add', addToCart);

router.delete('/remove/:userId/:itemIdDeId', removeFromCart);

router.get('/:userId', getCart);

router.put('/update/checked/:itemId/:userId',updateCartChecked);

router.put('/update/quantity/:itemId/:userId',updateCartQuantity);

export default router;
