const asyncHandler = require("express-async-handler");
const { successResponse } = require("../utilities/handleResponse");
const UserModel = require("../models/userModel");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const user = {};

user.health = asyncHandler(async (req, res) => {
  res.send("Hello World!");
});

user.register = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    const emailTaken = await UserModel.findOne({ email });
    if (emailTaken) {
      res.status(400);
      throw new Error("Email is taken");
    }

    const usernameTaken = await UserModel.findOne({
      username: username.trim(),
    });

    if (usernameTaken) {
      res.status(400);
      throw new Error("Username is taken");
    }
    const newUser = await UserModel.create({
      name: name.trim(),
      email: email.trim(),
      username: username.trim(),
      password: password.trim(),
    });

    if (newUser) {
      successResponse(res, 201, "Account created successfully.", newUser);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

user.update = asyncHandler(async (req, res) => {
  const check = await UserModel.findById(req.params.id);
  const { name, username, email, type, age, isVerified, height, about } =
    req.body;
  try {
    if (!check) {
      res.status(404);
      throw new Error("Id not found");
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        name: name,
        username: username,
        email: email,
        type: type,
        age: age,
        isVerified: isVerified,
        height: height,
        about: about,
      },
      {
        new: true,
      }
    );
    if (updatedUser) {
      successResponse(res, 201, "Account updated successfully.", updatedUser);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

user.picture = asyncHandler(async (req, res) => {
  // gets user param
  const check = await UserModel.findById(req.params.id);

  // sets path for file upload on cloudinary
  const uploader = async (path) =>
    await cloudinary.uploads(path, "express_auth");
  try {
    // check if id exists
    if (!check) {
      res.status(404);
      throw new Error("Id not found");
    }

    // declares url
    const urls = [];
    // gets files
    const files = req.files;
    if (!files) {
      res.status(400).send("No picture attached!");
    }

    // pushes file to cloudinary
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    // upload urls to database
    const updatedPicture = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        picture: urls,
      },
      {
        new: true,
      }
    );
    if (updatedPicture) {
      successResponse(res, 200, "picture updated successfully.", {
        message: "images uploaded successfully",
        picture: urls,
      });
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

module.exports = user;
