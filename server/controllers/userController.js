const asyncHandler = require("express-async-handler");
const user = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, profilePic } = req.body;
  if (!name || !email || !password) {
    res.status(400); // 204 => No content
    throw new Error("Please fill all fields.");
  }
  const isUserExists = await user.findOne({ email });
  if (isUserExists) {
    throw new Error("User already exists with this email.");
  }
  const User = await user.create({
    name,
    email,
    password,
    profilePic,
  });
  if (User) {
    res.status(201).json(User);
  } else {
    res.status(400);
    throw new Error("User not found.");
  }
});
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const User = await user.findOne({ email });
  if (User && (await User.isPasswordCorrect(password))) {
    res.send({
      User,
    });
  }
});

module.exports = { registerUser, authUser };
