const express = require("express");
const router = express.Router();

const {
  seedCart,
  getAllCart,
  getCartById,
  addNewCart,
  deleteCart,
  patchCart,
} = require("../controllers/cart");

router.get("/seed", seedCart);
router.get("/cart/item", getAllCart);
router.post("/cart/item", getCartById);

router.put("/cart/item", addNewCart);
router.patch("/cart/item/:id", patchCart);
router.delete("/cart/item/:id", deleteCart);

module.exports = router;
