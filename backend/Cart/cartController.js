import { Cart } from "./cartModel.js";

export const addToCart = async (req, res) => {
  try {
    const { userId, username, items } = req.body;

    let cartDocument = await Cart.findOne({ userId });

    if (cartDocument) {
      for (const newItem of items) {
        const existingItemIndex = cartDocument.items.findIndex(item => item.productId === newItem.productId && item.type === newItem.type);

        if (existingItemIndex !== -1 && newItem.type !== "service") {
          cartDocument.items[existingItemIndex].quantity += newItem.quantity;
        } else {
          cartDocument.items.unshift(newItem);
        }
      }
    } else {
      cartDocument = new Cart({
        userId,
        username,
        items,
      });
    }

    await cartDocument.save();

    res.status(201).json(cartDocument);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const removeFromCart = async (req, res) => {
  const { userId, itemIdDeId } = req.params;
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    cart.items = cart.items.filter(item => !item._id.equals(itemIdDeId));
    
    await cart.save();

    res.status(200).json(cart.items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateCartChecked = async (req, res) => {
  const { userId, itemId } = req.params;
  const { checked } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found" });
    }

    cart.items[itemIndex].checked = checked;

    await cart.save();

    res.status(200).json({ message: "Item updated successfully", data: cart.items[itemIndex] });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const updateCartQuantity = async (req, res) => {
  const { userId, itemId } = req.params;
  const { quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found" });
    }

    cart.items[itemIndex].quantity = quantity;

    await cart.save();

    res.status(200).json({ message: "Quantity updated successfully", data: cart.items[itemIndex] });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

