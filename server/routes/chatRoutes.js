const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  accessChat,
  createGroupChat,
  fetchChats,
  renameGroup,
} = require("../controllers/chatController");
const chatRouter = express.Router();

chatRouter.route("/").post(protect, accessChat);
chatRouter.route("/").get(protect, fetchChats);
chatRouter.route("/group").post(protect, createGroupChat);
chatRouter.route("/rename-group").put(protect, renameGroup);
