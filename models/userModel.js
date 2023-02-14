const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    // id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   unique: true,
    //   required: true,
    // },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    age: {
      type: Number,
    },
    picture: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    height: {
      type: Number,
    },
    about: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
