const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 8080;


app.get('/', function(req, res) {
    res.send("hello from socketio")
//    res.sendfile('index.html');
});

server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
