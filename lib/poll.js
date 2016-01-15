const crypto = require('crypto');

function generateUid() {
  return crypto.randomBytes(12).toString('hex');
}

function Poll() {
  this.id = generateUid();
  this.adminUrl = '/admin/' + this.id;
  this.voteId = generateUid();
  this.voterUrl = '/poll/' + this.voteId;
  this.pollTitle = null;
  this.pollClosed = false;
  this.stopTime = null;
  this.choices = [];
  this.votes = {};
}


module.exports = Poll;
