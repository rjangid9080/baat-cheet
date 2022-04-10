const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const chatRouter = express.Router();