var socket = io();
var adminId = window.location.pathname.split('/').slice(-1).pop();
var adminClosed = document.getElementById('buttonclose');

socket.on('closePoll-' + adminId, function(message) {
  closePollButton.remove();
  adminClosed.innerText = message;
});
