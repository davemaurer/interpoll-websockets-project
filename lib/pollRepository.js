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
  if(type === 'admin') {
    return collection[identifier]
  } else {
    var poll;
    for (var prop in collection) {
      if(collection[prop].id === identifier) {
        poll = collection[prop];
      }
    }
    return poll;
  }
};

PollRepository.prototype.checkForStopTime = function(pollData, res) {
  var poll = pollData;
  var timeNowInSeconds = toSeconds(this.adjustTime());
  var stopTimeInSeconds = toSeconds(poll.stopTime);
  if(timeNowInSeconds > stopTimeInSeconds) {
    //this.polls[poll.id] = null;
    res.render('closed');
  } else {
    res.render('poll', {poll: poll, pollChoices: poll.choices});
  }
};

PollRepository.prototype.adjustTime = function() {
  var time = new Date();
  return time.toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute: '2-digit'});
};

function toSeconds(t) {
  var bits = t.split(':');
  return bits[0]*3600 + bits[1]*60;
}

module.exports = PollRepository;
