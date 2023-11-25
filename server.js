const app = require('express')();
const routes=require("./routes/chatRoutes")
const server = require('http').createServer(app);
require("dotenv").config()
const io = require('socket.io')(server);
const connectDB =require("./db/conn")

const port = process.env.PORT || 8888;

connectDB();

app.get('/', function(req, res) {
    res.send("hello from socketio")
//    res.sendfile('index.html');
});

app.use(routes);

server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
