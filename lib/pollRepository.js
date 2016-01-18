const Poll = require('./poll');

function PollRepository() {
  this.polls = {};
}

PollRepository.prototype.createPoll = function(pollData) {
  var newPoll = new Poll(pollData);
  this.polls[newPoll.adminId] = newPoll;
  return newPoll;
};

PollRepository.prototype.findPoll = function(id, type) {
  var collection = this.polls;
  if(type === 'admin') {
    return collection[id]
  } else {
    var poll;
    for (var prop in collection) {
      console.log(collection[prop][id]);
      if(collection[prop][id] === id) {
        console.log('working');
        poll = collection.prop[id];
      }
      console.log(poll);
    }
    return poll;
  }
};

module.exports = PollRepository;
