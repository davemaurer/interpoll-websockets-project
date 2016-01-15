function StartPollButton() {
  var target = document.querySelector('#start-poll-button');
  target.on('click', function() {

  })
}

AddOptionButton.prototype.activate = function() {
  this.element.addEventListener('click', this.appendOptionToDom.bind(this));
};

AddOptionButton.prototype.appendOptionToDom = function() {
  var optionBox = this.appendLocation.querySelector('.form-group');
  var clone = optionBox.cloneNode(true);
  clone.querySelector('input').value = '';
  this.appendLocation.appendChild(
    clone
  )
};

// need this in place of module.exports because no webpack access. this creates a global object.
window.StartPollButton = StartPollButton;
