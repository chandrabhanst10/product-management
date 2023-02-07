const mongoose = require("mongoose");

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      uppercase: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    phone: {
      type: Number,
      trim: true,
      required: true,
      //  min:10,
      //  max:10,
      validator: function (v) {
        return /^([0-9]{10}$)/.test(v);
      },
    },

    role: {
      type: String,
      required: true,
      uppercase: true,
    },
    isAdmin: {
      type: String,
      default: "false",
    },
    user: {
      type: String,
      default: "none",
    },
    password: {
      type: String,
      required: true,
      trim: true,
      min: 6,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
