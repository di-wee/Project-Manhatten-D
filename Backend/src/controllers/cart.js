const cartModel = require("../models/Cart");
const Product = require("../models/Products");

const getCart = async (req, res) => {
  try {
    res.json(req.session.cart || { items: [], totalAmount: 0 });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: "error getting cart" });
  }
};

const addNewCart = async (req, res) => {
  try {
    const product = await Product.findById(req.body.id);
    if (!product) {
      res.status(400).json({ status: "error", msg: "product not found!" });
    }

    let cart = req.session.cart; //creating a variable for the cart for a particular session

    //if no active session for cart; to create empty cart array
    if (!cart) {
      cart = {
        items: [],
        totalAmount: 0,
      };
    }
    //managing quanities for cart

    //finding the index in the cart if the item that is added matches
    const findIndex = cart.items.findIndex(
      (item) => item.product.toString() === req.body.id // item.products is essentially the objectID of a product
    );

    // if the product is in the cart, update its quantity
    if (findIndex > -1) {
      cart.items[findIndex].quantity += req.body.quantity;
      cart.totalAmount += product.price * req.body.quantity;

      //or else just add it into cart as a new item
    } else {
      const cartItem = {
        product: req.body.id,
        price: product.price,
        quantity: req.body.quantity || 1,
      };
      cart.items.push(cartItem);
      cart.totalAmount += cartItem.price * cartItem.quantity;
    }
    req.session.save();
    res.status(200).json({
      status: "ok",
      msg: "item added to cart!",
      cart: req.session.cart,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ status: "error", msg: "unable to add item to cart" });
  }
};

const deleteCart = async (req, res) => {
  await cartModel.deleteOne({ _id: req.params.id });
  res.json({ status: "ok", message: "deleted" });
};

const patchCart = async (req, res) => {
  const itemId = req.params.item_id;

  try {
    // Find the item in the cart and update it
    const updatedItem = await cartModel.updateOne(
      { _id: itemId },
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          description: req.body.description,
          image: req.body.image,
          category: req.body.category,
        },
      }
    );

    res.status(200).json({ message: "Item updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

module.exports = {
  getCart,
  addNewCart,
  deleteCart,
  patchCart,
  addNewCart,
};
