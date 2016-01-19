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

const io = socketIo(server);

app.get('/', function(req, res) {
  res.render('home');
});

app.post('/', function(req, res) {
  var poll = pollRepository.createPoll(req.body.poll);
  poll.showVoteResults = req.body.poll.showVoteResults;
  poll.stopTime = req.body.poll.stopTime;
  res.redirect('/' + poll.adminUrl);
});

app.get('/poll/:id', function(req, res) {
  var foundPoll = pollRepository.findPoll(req.params.id);
  //pollRepository.checkForStopTime(foundPoll, res);
  res.render('poll', {poll: foundPoll, pollChoices: foundPoll.choices});
});

app.get('/admin/:id', function(req, res) {
  var foundPoll = pollRepository.findPoll(req.params.id, 'admin');
  res.render('admin', { poll: foundPoll });
  //if(foundPoll.votes) {
  //  io.sockets.emit('voteEmit-' + foundPoll.id, foundPoll.votes);
  //  io.sockets.emit('voteEmit-' + foundPoll.adminId, foundPoll.votes);
  //}
});


io.on('connection', function(socket) {

  socket.on('message', function(channel, message) {
    if(channel === 'voteCast-' + message.pollId) {
      var poll = pollRepository.findPoll(message.pollId);
      poll.analyzeResponse(message);
      emitVote(poll);
    } else if(channel === 'closePoll-' + message) {
      var poll = pollRepository.findPoll(message, 'admin').closePoll();
      io.sockets.emit('closePoll-' + poll.id, 'Poll Closed! Thanks!');
      io.sockets.emit('closePoll-' + poll.adminId, 'You have closed this poll');
    }
  });

  socket.on('disconnect', function() {
    console.log('A user has disconnected.', io.engine.clientsCount);
    io.sockets.emit('usersConnected', io.engine.clientsCount);
  });
});

function emitVote(poll) {
  io.sockets.emit('voteEmit-' + poll.id, poll.votes);
  io.sockets.emit('voteEmit-' + poll.adminId, poll.votes);
}

module.exports = server;
