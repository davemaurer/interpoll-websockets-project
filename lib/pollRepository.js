const Poll = require('./poll');

function PollRepository() {
  this.polls = {};
}

PollRepository.prototype.createPoll = function(pollData) {
  var newPoll = new Poll(pollData);
  this.polls[newPoll.adminId] = newPoll;
  return newPoll;
};

PollRepository.prototype.findPoll = function(identifier, type) {
  var collection = this.polls;
  console.log('this is the poll object', this.polls);
  if(type === 'admin') {
    return collection[identifier]
  } else {
    var poll;
    for (var prop in collection) {
      console.log("obj." + prop + " = " + collection[prop]);
      if(collection[prop].id === identifier) {
        poll = collection[prop];
        console.log('this is the poll', poll);
      }
    }
    return poll;
  }
};

module.exports = PollRepository;
