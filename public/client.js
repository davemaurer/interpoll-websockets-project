var socket = io();
var connectionCount = document.getElementById('connection-count');

function activateAddOptionButton() {
  var addOptionButton = new AddOptionButton(
    document.querySelector('.add-option-button'),
    document.querySelector('.append-option')
  );
console.log(addOptionButton);
  addOptionButton.activate();
}

socket.on('usersConnected', function(count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});



activateAddOptionButton();
