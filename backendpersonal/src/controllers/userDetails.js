const UserDetails = require("../models/UserDetails");

//for user to add user
const putUser = async (req, res) => {
  try {
    const createUser = new UserDetails({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      shippingAddress: req.body.shippingAddress,
    });
    await createUser.save();
    res.json({ status: "ok", msg: "saved" });
  } catch (error) {
    console.log(error.msg);
    res.json({ status: "error", message: error.msg });
  }
};

//for admin to retrieve all users
const getAllUsers = async (req, res) => {
  try {
    const user = await UserDetails.find();
    res.json(user);
  } catch (error) {
    console.log(error.msg);
    res.json({ status: "error", message: error.msg });
  }
};

//for admin to retrieve 1 user
const postUser = async (req, res) => {
  try {
    const user = await UserDetails.findById(req.params.id);
    res.json(user);
  } catch (error) {
    console.log(error.msg);
    res.json({ status: "error", message: error.msg });
  }
};

//for admin to edit user
const patchUser = async (req, res) => {
  try {
    const updateUser = await UserDetails.updateOne(
      {
        _id: req.params.id,
      },
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        shippingAddress: req.body.shippingAddress,
      }
    );
    res.json({ status: "ok", msg: "saved" });
  } catch (error) {
    console.log(error.msg);
    res.json({ status: "error", message: error.msg });
  }
};

//for admin to delete user
const deleteUser = async (req, res) => {
  try {
    const deleteUser = await UserDetails.deleteOne({
      _id: req.params.id,
    });
    res.json({ status: "ok", msg: "deleted" });
  } catch (error) {
    console.log(error.msg);
    res.json({ status: "error", message: error.msg });
  }
};

module.exports = {
  putUser,
  getAllUsers,
  postUser,
  patchUser,
  deleteUser,
};
