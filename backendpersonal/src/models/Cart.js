const mongoose = require("mongoose");
const today = new Date();
const now = today.getHours() + ":" + today.getMinutes();

const ShoppingCartSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minLength: 1, maxLength: 50 },
    price: { type: Number, required: true, minLength: 1, maxLength: 50 },
    description: { type: String, default: today },
    image: { type: String, required: true },
    category: { type: String, required: true },
  },
  { collection: "ShoppingCart" }
);

module.exports = mongoose.model("ShoppingCart", ShoppingCartSchema);
