const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
      //   shippingAddresses: [
      //     { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
      //   ],
    },
  },
  { collection: "userDetails" }
);

module.exports = mongoose.model("UserDetails", UserDetailsSchema);
