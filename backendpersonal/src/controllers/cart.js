const cartModel = require("../models/Cart");
const seedCart = async (req, res) => {
  try {
    await cartModel.deleteMany();

    await cartModel.create([
      {
        _id: "64d0f3f75676c304033d8c8a",
        title: "planemcplaneface",
        price: 13.5,
        description: "lorem ipsum set",
        image: "https://i.pravatar.cc",
        category: "electronic",
      },
      {
        _id: "64d0f3f75676c304033d8c89",
        title: "baggybaggins",
        price: 13.5,
        description: "lorem ipsum set",
        image: "https://i.pravatar.cc",
        category: "electronic",
      },
      {
        _id: "64d0f3f75676c304033d8c8b",
        title: "cinnaroll",
        price: 13.5,
        description: "lorem ipsum set",
        image: "https://i.pravatar.cc",
        category: "electronic",
      },
    ]);

    res.json({ status: "ok", msg: "seeding successful" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "error.message" });
  }
};

const getAllCart = async (req, res) => {
  try {
    const allCart = await cartModel.find();
    res.json(allCart);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: "error.message" });
  }
};

const getCartById = async (req, res) => {
  try {
    const cart = await cartModel.findById(req.body.id);
    res.json(cart);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "error.message" });
  }
};

const addNewCart = async (req, res) => {
  console.log(req.body);

  try {
    const newCart = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
    };
    await cartModel.create(newCart);
    res.json({ status: "ok", msg: "shopping cart saved" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: "error.message" });
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
  seedCart,
  getAllCart,
  getCartById,
  addNewCart,
  deleteCart,
  patchCart,
  addNewCart,
};
