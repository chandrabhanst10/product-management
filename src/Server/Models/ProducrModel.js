const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      uppercase: true,
    },
    description: {
      type: String,
      required: true,
      uppercase: true,
    },
    price: {
      type: String,
      trim: true,
      required: true,
      uppercase: true,
    },

    company: {
      type: String,
      required: true,
      uppercase: true,
    },
    category: {
      type: String,
      required: true,
      uppercase: true,
    },

    user: {
      type: String,
      default: "user",
      uppercase: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("product", productSchema);
module.exports = Product;
