var socket = io();
var pollResults = document.getElementsByClassName('tally');
var adminResults = document.getElementById('admin-tally');
var choiceButtons = document.getElementById('choice-buttons');
var pollClosed = document.getElementById('pollclosed-message');
var adminClosed = document.getElementById('adminclosed');
var closePollButton = document.getElementById('buttonclose');
var buttons = document.querySelectorAll('#choices button');
var pollId = window.location.pathname.split('/').slice(-1).pop();

function activateAddOptionButton() {
  var addOptionButton = new AddOptionButton(
    document.querySelector('.add-option-button'),
    document.querySelector('.append-option')
  );
  addOptionButton.activate();
}

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    socket.send('voteCast-' + pollId, {
      pollId: pollId,
      vote: this.innerText,
      voter: socket.id
    });
  })
}

$('.poll-closed').on('click', function() {
  socket.send('closePoll-' + pollId, pollId)
});

socket.on('closePoll-' + pollId, function(message) {
  closePollView(message);
  closeAdminView(message);
});

socket.on('voteEmit-' + pollId, function(votes) {
  var result = '';
  for(var choice in votes){
    result += choice + ': ' + votes[choice] + '  ';
  }
  for (i = 0; i < pollResults.length; i++) {
    pollResults[i].innerText = 'Current Results: ' + result;
  }
  adminResults.innerText = 'Current Results: ' + result;
  if(choiceButtons) {
    choiceButtons.remove();
  }
});

function closePollView(message) {
  if(choiceButtons) {
    choiceButtons.remove();
    pollClosed.innerText = message;
  }
}

function closeAdminView(message) {
  if(closePollButton) {
    closePollButton.remove();
    adminClosed.innerText = message;
  }
}

activateAddOptionButton();
