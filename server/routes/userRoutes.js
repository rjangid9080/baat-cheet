const express = require("express");
const {
  registerUser,
  authUser,
  allUser,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const userRouter = express.Router();
userRouter.route("/").post(registerUser).get(protect,allUser);
userRouter.route("/login").post(authUser);
module.exports = userRouter;
