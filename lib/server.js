const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const socketIo = require('socket.io');
const PollRepository = require('./pollRepository');
const app = express();
const port = process.env.PORT || 3000;

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

var pollRepository = new PollRepository;

app.post('/', function(req, res) {
  debugger;
  var poll = pollRepository.createPoll(req.body.poll);
  console.log(req.body.poll, poll.adminUrl, poll.id);
  res.redirect('/' + poll.adminUrl);
});

app.get('/poll/:id', function(req, res) {
  res.render('poll', { poll: pollRepository.findPoll(req.params.id) });
});

app.get('/admin/:id', function(req, res) {
  res.render('admin', { poll: pollRepository.findPoll(req.params.id, 'admin') });
});


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
