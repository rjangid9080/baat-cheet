const express = require("express");
const connectDB = require("./config/mongoDb");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
//const msgRoutes = require("./routes/msgRoutes");

dotenv.config();
//<--Connecting Database-->
connectDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is baat-cheet server");
});
const PORT = process.env.Port;
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
//app.use("/api/message",msgRoutes);

app.listen(PORT, (req, res) => {
  console.log(`Server is live on http://localhost:${PORT}`);
});
