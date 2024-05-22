import { Cart } from "./cartModel.js";


export const addToCart = async (req, res) => {
  try {
    const { userId, username, items } = req.body;
    
    let cartDocument = await Cart.findOne({ userId });

    if (cartDocument) {
      items.forEach(newItem => {
        const existingItemIndex = cartDocument.items.findIndex(item => item.productId === newItem.productId && item.type === newItem.type);

        if (existingItemIndex !== -1 && newItem.type !== "service") {
          cartDocument.items[existingItemIndex].quantity += newItem.quantity;
        } else {
          cartDocument.items.push(newItem);
        }
      });
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
  console.log("abc:",userId);
  console.log("cart:",itemIdDeId);
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

export const updateCart = async (req,res) => {
  const { userId } = req.body;
  const { itemId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in the cart' });
    }

     if (quantity === 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

