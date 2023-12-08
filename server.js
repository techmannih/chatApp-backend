const express = require('express');
const app = express();
const chatRoutes = require('./routes/chatRoutes');
const userRoutes = require('./routes/userRoutes');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const connectDB = require('./db/conn');
require('dotenv').config();

const port = process.env.PORT || 8888;

connectDB();

app.get('/', function (req, res) {
  res.send('Hello from socket.io');
  // res.sendfile('index.html');
});

app.use(express.json());
app.use(chatRoutes);
app.use(userRoutes);

server.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
