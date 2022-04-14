const asyncHandler = require("express-async-handler");
const chatDB = require("../models/chatModel");
const userDB = require("../models/userModel");

const accessChat = asyncHandler(async (req, res) => {
  const { userID } = req.body;
  if (!userID) {
    console.log("UserID is not sent");
    return res.sendStatus(400);
  }
  let isChat = await chatDB
    .find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.User._id } } },
        { users: { $elemMatch: { $eq: userID } } },
      ],
    })
    .populate("users", "-password")
    .populate("latestMessage");
  isChat = await userDB.populate(isChat, {
    path: "latestMessage.sender",
    select: "name profilePic email",
  });
  let chatData;
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.User._id, userID],
    };
  }
  try {
    const createdChat = await Chat.create(chatData);
    const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );
    res.status(200).json(FullChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    chatDB
      .find({ users: { $elemMatch: { $eq: req.User._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (result) => {
        result = await userDB.populate(result, {
          path: "latestMessage.sender",
          select: "name profilePic email",
        });
        res.status(200).send(result);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res
      .status(400)
      .send({ message: "Please fill all the required fields." });
  }
  let users = JSON.parse(req.body.users);
  if (users.length < 2) {
    return res
      .status(400)
      .send({ message: "Group Chat have atleast 2 members." });
  }
  users.push(req.User);
  try {
    const groupChat = await chatDB.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.User,
    });

    const fullGroupChat = await chatDB
      .findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).send(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await chatDB
    .findByIdAndUpdate(chatId, { chatName }, { new: true })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!updatedChat) {
    res.status(404);
    throw new Error("chat not found");
  } else {
    res.status(200).json(updatedChat);
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const userAdded = await chatDB
    .findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      { new: true }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!userAdded) {
    res.status(404);
    throw new Error("user not added");
  } else {
    res.status(200).json(userAdded);
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const userRemoved = await chatDB
    .findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      { new: true }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!userRemoved) {
    res.status(404);
    throw new Error("user not removed");
  } else {
    res.status(200).json(userRemoved);
  }
});

module.exports = {
  accessChat,
  createGroupChat,
  fetchChats,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
