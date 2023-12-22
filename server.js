const express = require("express");
const app = express();
const chatRoutes = require("./routes/chatRoutes");
const userRoutes = require("./routes/userRoutes");
const http = require("http");
const server = http.createServer(app);
const initializeSocket = require("./socket/module");
const connectDB = require("./db/conn");
require("dotenv").config();
const cors = require("cors");

const port = process.env.PORT || 8888;

connectDB();
app.use(cors());

// Set up Socket.IO
initializeSocket(server);

app.get("/", function (req, res) {
  res.send("Hello from socket.io");
  // res.sendfile('index.html');
});

app.use(express.json());
app.use(chatRoutes);
app.use(userRoutes);

server.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
