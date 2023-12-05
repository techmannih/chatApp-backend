const app = require('express')();
const chatRoutes=require("./routes/chatRoutes")
const userRoutes=require("./routes/userRoutes")
const server = require('http').createServer(app);
require("dotenv").config()
const io = require('socket.io')(server);
const connectDB =require("./db/conn")
const cors = require('cors');

const port = process.env.PORT || 8888;
app.use(cors());

connectDB();

app.get('/', function(req, res) {
    res.send("hello from socketio")
//    res.sendfile('index.html');
});

app.use(chatRoutes);
app.use(userRoutes);

server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
