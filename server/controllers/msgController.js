const asyncHandler = require("express-async-handler");
const chatDB = require("../models/chatModel");
const userDB = require("../models/userModel");
const msgDB = require("../models/messageModel");

const sendMessage = asyncHandler(async (req, res) => {
  const { chatId, content } = req.body;

  if (!chatId || !content) {
    return res.status(400).send("Invalid data");
  }

  let newMsg = {
    sender: req.User._id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await msgDB.create(newMsg);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await userDB.populate(message, {
      path: "chat.users",
      select: "name profilePic email",
    });
    await chatDB.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await msgDB
      .find({ chat: req.params.chatId })
      .populate("sender", "name profilePic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendMessage, allMessages };
