const http = require('http');
const express = require('express');
const exphbs = require('express-handlebars');
const socketIo = require('socket.io');
const Poll = require('./poll');

const app = express();

var polls = {};

app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
  res.render('home');
});

app.post('/', function(req, res) {
  var poll = new Poll(req.body.poll);
  polls[poll.id] = poll;
  res.redirect('/' + poll.adminUrl);
});

app.get('/poll', function(req, res) {
  res.render('poll');
});

app.get('/admin', function(req, res) {
  res.render('admin', { poll: new Poll }
  );
});

var port = process.env.PORT || 3000;

var server = http.createServer(app)
  .listen(port, function() {
    console.log('Listening on port ' + port + '.');
  });

const io = socketIo(server);

io.on('connection', function (socket) {
  console.log('A user has connected.', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);

  socket.on('disconnect', function() {
    console.log('A user has disconnected.', io.engine.clientsCount);
    io.sockets.emit('usersConnected', io.engine.clientsCount);
  });
});



module.exports = server;
