const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { sendMessage, allMessages } = require("../controllers/msgController");
const msgRouter = express.Router();

msgRouter.route("/").post(protect, sendMessage);
msgRouter.route("/:chatId").get(protect, allMessages);

module.exports = msgRouter;
