const express = require("express");
const { registerUser } = require("../controllers/userController");

const userRouter = express.Router();
userRouter.route("/").post(registerUser);

module.exports = userRouter;
