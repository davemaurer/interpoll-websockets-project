const Poll = require('./poll');

function PollRepository() {
  this.polls = {};
}

PollRepository.prototype.createPoll = function(pollData) {
  var newPoll = new Poll(pollData);
  this.polls[newPoll.adminId] = newPoll;
};

PollRepository.prototype.findPoll = function(id) {
  return this.polls[id]
};

module.exports = PollRepository;
