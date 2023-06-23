const { Router } = require("express");
const router = Router();
const { errorHandler } = require("../utils/errorHandler");

const {
  createShoppingCart,
  getShoppingCartByUserId,
  addItemToShoppingCart,
  removeItemFromShoppingCart,
  updateItemInShoppingCart,
  clearShoppingCart,
} = require("../controllers/cartControllers");

router.post("/", errorHandler(createShoppingCart));
router.get("/:userid", errorHandler(getShoppingCartByUserId));
router.post("/:userid/items", errorHandler(addItemToShoppingCart));
router.delete(
  "/:userId/items:itemid",
  errorHandler(removeItemFromShoppingCart)
);
router.put("/:userid/items:itemid", errorHandler(updateItemInShoppingCart));
router.delete("/:userid", errorHandler(clearShoppingCart));

module.exports = router;
