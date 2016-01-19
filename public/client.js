var socket = io();
var connectionCount = document.getElementById('connection-count');
var pollResults = document.getElementById('poll-results');
var pollId = window.location.pathname.split('/').slice(-1).pop();

socket.on('usersConnected', function(count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

function activateAddOptionButton() {
  var addOptionButton = new AddOptionButton(
    document.querySelector('.add-option-button'),
    document.querySelector('.append-option')
  );
  addOptionButton.activate();
}

$(document).ready(function() {
  $('.choice-title').on('click', function() {
    var vote = $(this).text();
    console.log(vote);
    castVote(vote);
  })
});

function castVote(vote) {
  console.log(pollId);
  socket.send('voteCast', {
    pollId: pollId,
    vote: vote,
    voter: socket.id
  })
}

socket.on('voteEmit', function(votes) {
  for(var choice in votes){
    pollResults.innerText =
      '<div>Choice: ' + choice + ' has ' + votes[choice] + " votes</div>"
  }
});

activateAddOptionButton();
