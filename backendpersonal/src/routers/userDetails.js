const express = require("express");
const router = express.Router();

const {
  putUser,
  getAllUsers,
  postUser,
  patchUser,
  deleteUser,
} = require("../controllers/userDetails");

router.put("/userdetails", putUser);
router.get("/userdetails", getAllUsers);
router.post("/userdetails/:id", postUser);
router.patch("/userdetails/:id", patchUser);
router.delete("/userdetails/:id", deleteUser);

module.exports = router;
