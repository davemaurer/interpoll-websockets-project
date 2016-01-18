var socket = io();
var connectionCount = document.getElementById('connection-count');
var pollId = window.location.pathname.split('/').slice(-1).pop();

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
  socket.send('voteCast', {
    pollId: pollId,
    vote: vote,
    voter: socket.id
  })
}

socket.on('usersConnected', function(count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

activateAddOptionButton();
