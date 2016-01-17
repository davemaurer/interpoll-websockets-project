const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const socketIo = require('socket.io');
const PollRepository = require('./pollRepository');
const app = express();

var pollRepository = new PollRepository;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
  res.render('home');
});

app.post('/', function(req, res) {
  var poll = pollRepository.createPoll(req.body.poll);
  polls[poll.id] = poll;
  res.redirect('/' + poll.adminUrl);
});

app.get('/poll', function(req, res) {
  res.render('poll');
});

app.get('/admin/:id', function(req, res) {
  res.render('admin');
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
