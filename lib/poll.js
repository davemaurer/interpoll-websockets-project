const crypto = require('crypto');

function generateUid() {
  return crypto.randomBytes(12).toString('hex');
}

function Poll(pollParams) {
  this.id = generateUid();
  this.adminId = generateUid();
  this.adminUrl = 'admin/' + this.adminId;
  this.voterUrl = 'poll/' + this.id;
  this.pollTitle = pollParams.pollTitle;
  this.pollClosed = false;
  this.stopTime = null;
  this.choices = pollParams.choices;
  this.votes = {};
  this.showVoteResults = false;
}

Poll.prototype.addVote = function(vote) {
  if (this.votes[vote]) {
    this.votes[vote] += 1;
  } else {
    this.votes[vote] = 1;
  }
};

module.exports = Poll;
