const http = require('http');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const socketIo = require('socket.io');
const PollRepository = require('./lib/pollRepository');
var pollRepository = new PollRepository;
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;
var server = http.createServer(app).listen(port, function() {
    console.log('Listening on port ' + port + '.');
  });

app.get('/', function(req, res) {
  res.render('home');
});

app.post('/', function(req, res) {
  var poll = pollRepository.createPoll(req.body.poll);
  poll.showVoteResults = req.body.poll.showVoteResults;
  res.redirect('/' + poll.adminUrl);
});

app.get('/poll/:id', function(req, res) {
  var foundPoll = pollRepository.findPoll(req.params.id);
  res.render('poll', { poll: foundPoll, pollChoices: foundPoll.choices });
  console.log(req.params.id);
});

app.get('/admin/:id', function(req, res) {
  res.render('admin', { poll: pollRepository.findPoll(req.params.id, 'admin') });
});

const io = socketIo(server);

io.on('connection', function(socket) {
  //io.sockets.emit('usersConnected', io.engine.clientsCount);

  socket.on('message', function(channel, message) {
    if(channel === 'voteCast') {
      var poll = pollRepository.findPoll(message.pollId);
      poll.analyzeResponse(message);
      emitVote(poll);
    }
  });

  socket.on('disconnect', function() {
    console.log('A user has disconnected.', io.engine.clientsCount);
    io.sockets.emit('usersConnected', io.engine.clientsCount);
  });
});

function emitVote(poll) {
  io.sockets.emit('voteEmit-' + poll.pollId, poll.votes)
}

module.exports = server;
