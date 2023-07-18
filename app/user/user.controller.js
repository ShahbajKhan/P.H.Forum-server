const express = require("express");
const router = express.Router();

const User = require("./user.model");
const catchAsync = require("../../utils/catchAsync");
const { createNewUser, loginAnUser, getUser } = require("./user.services");

exports.createUser = catchAsync(async (req, res, next) => {
  const { email, password, name, role } = req.body;

  try {
    // check if the user already exists
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // create new user
    const user = await createNewUser({ email, password, name, role });
    console.log({ user });
    res.status(200).json({
      success: true,
      message: "Successfully created the user.....",
      token: user,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // check if the user exists
    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
      return res.status(400).json({
        success: false,
        message: "Either email or password is incorrect!",
      });
    }

    // sign in an user
    const loggedInUser = await loginAnUser(
      { email, password },
      { user: isUserExist }
    );

    res.status(200).json({
      success: true,
      message: "Successfully logged in the user",
      token: loggedInUser,
    });
  } catch (err) {
    console.log({ err });
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

// get user info
exports.getUserInfo = catchAsync(async (req, res, next) => {
  const { id: userId } = req.params;

  try {
    // find the user. and send all info except password.
    const user = await getUser(userId);

    return res.status(200).json({
      success: true,
      message: "Successfully found the user",
      user,
    });
  } catch (err) {
    console.log({ err });
    res.status(500).send({
      success: false,
      message: "User info unable to fetch!",
    });
  }
});
