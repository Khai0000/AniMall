import { Cart } from "./cartModel.js";
import { Product } from "../Product/productModel.js"; 
import { ServiceItemsModel } from "../ServicesFile/serviceItemModel.js";

export const addToCart = async (req, res) => {
  const { userId } = req.user; 
  const { productId, quantity, type } = req.body;

  try {
    let item;
    if (type === 'product') {
      item = await Product.findById(productId);
    } else if (type === 'service') {
      item = await ServiceItemsModel.findById(productId);
    }

    if (!item) {
      return res.status(404).json({ message: `${type.charAt(0).toUpperCase() + type.slice(1)} not found` });
    }

    const price = item.price;
    const totalPrice = price * quantity;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity, price, totalPrice, type }] });
    } else {
      const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId && item.type === type);
      if (existingItemIndex !== -1) {
        cart.items[existingItemIndex].quantity += quantity;
        cart.items[existingItemIndex].totalPrice += totalPrice;
      } else {
        cart.items.push({ productId, quantity, price, totalPrice, type });
      }
    }

    await cart.save();

    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const removeFromCart = async (req, res) => {
  const { userId } = req.user; 
  const { itemId } = req.params;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
