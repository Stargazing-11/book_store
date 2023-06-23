const { ShopingCart, findError } = require("../models/cartModel.js");

async function createShoppingCart(req, res) {
  try {
    const { userId, items } = req.body;
    const shoppingCart = await ShoppingCart.create({ userId, items });
    res
      .status(201)
      .json({ message: "Shopping cart created successfully", shoppingCart });
  } catch (error) {
    res.status(500).json({ message: "Failed to create shopping cart", error });
  }
}

async function getShoppingCartByUserId(req, res) {
  try {
    const { userId } = req.params;
    const shoppingCart = await ShoppingCart.findOne({ userId });
    res.json({ shoppingCart });
  } catch (error) {
    res.status(500).json({ message: "Failed to get shopping cart", error });
  }
}

async function addItemToShoppingCart(req, res) {
  try {
    const { userId } = req.params;
    const { bookId, amount } = req.body;
    const shoppingCart = await ShoppingCart.findOneAndUpdate(
      { userId },
      { $push: { items: { bookId, amount } } },
      { new: true }
    );
    res.json({
      message: "Item added to shopping cart successfully",
      shoppingCart,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add item to shopping cart", error });
  }
}

async function removeItemFromShoppingCart(req, res) {
  try {
    const { userId, itemId } = req.params;
    const shoppingCart = await ShoppingCart.findOneAndUpdate(
      { userId },
      { $pull: { items: { _id: itemId } } },
      { new: true }
    );
    res.json({
      message: "Item removed from shopping cart successfully",
      shoppingCart,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to remove item from shopping cart", error });
  }
}

async function updateItemInShoppingCart(req, res) {
  try {
    const { userId, itemId } = req.params;
    const { amount } = req.body;
    const shoppingCart = await ShoppingCart.findOneAndUpdate(
      { userId, "items._id": itemId },
      { $set: { "items.$.amount": amount } },
      { new: true }
    );
    res.json({
      message: "Item updated in shopping cart successfully",
      shoppingCart,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update item in shopping cart", error });
  }
}

async function clearShoppingCart(req, res) {
  try {
    const { userId } = req.params;
    await ShoppingCart.findOneAndUpdate({ userId }, { items: [] });
    res.json({ message: "Shopping cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to clear shopping cart", error });
  }
}

module.exports = {
  createShoppingCart,
  getShoppingCartByUserId,
  addItemToShoppingCart,
  removeItemFromShoppingCart,
  updateItemInShoppingCart,
  clearShoppingCart,
};
