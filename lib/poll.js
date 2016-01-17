const crypto = require('crypto');

function generateUid() {
  return crypto.randomBytes(12).toString('hex');
}

function Poll(pollParams) {
  this.id = generateUid();
  this.adminId = generateUid();
  this.voterId = generateUid();
  //this.adminUrl = '/admin/' + this.adminId;
  this.voterUrl = '/poll/' + this.voteId;
  this.pollTitle = null;
  this.pollClosed = false;
  this.stopTime = null;
  this.choices = pollParams.choices;
  this.votes = {};
}

Poll.prototype.addVote = function(vote) {
  if (this.votes[vote]) {
    this.votes[vote] += 1;
  } else {
    this.votes[vote] = 1;
  }
};

Poll.prototype.adminUrl = function() {
  return '/admin/' + this.adminId;
};

module.exports = Poll;
