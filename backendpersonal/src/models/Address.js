const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    addressLine1: {
      type: String,
      required: true,
    },

    addressLine2: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    postalCode: {
      type: Number,
      required: true,
    },
  },
  { collection: "address" }
);

module.exports = mongoose.model("Address", AddressSchema);
