const express = require("express");
const { registerUser, authUser ,allUser } = require("../controllers/userController");

const userRouter = express.Router();
userRouter.route("/").post(registerUser).get(allUser);
userRouter.route("/login").post(authUser);
module.exports = userRouter;
