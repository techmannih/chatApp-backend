const app = require('express')();
const server = require('http').createServer(app);
const dotenv =require("dotenv")
const io = require('socket.io')(server);
const connectDB =require("./db/conn")

const port = process.env.PORT || 8080;

connectDB();
dotenv.config()

app.get('/', function(req, res) {
    res.send("hello from socketio")
//    res.sendfile('index.html');
});

server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
