const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const Poll = require('poll');

const app = express();

var polls = {}

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/poll', function(req, res) {
  res.sendFile(__dirname + '/public/poll.html');
});

var port = process.env.PORT || 3000;

var server = http.createServer(app)
  .listen(port, function() {
    console.log('Listening on port ' + port + '.');
  });

const io = socketIo(server);

io.on('connection', function (socket) {
  console.log('A user has connected.', io.engine.clientsCount);

  socket.on('disconnect', function() {
    console.log('A user has disconnected.', io.engine.clientsCount);
  });
});

module.exports = server;
