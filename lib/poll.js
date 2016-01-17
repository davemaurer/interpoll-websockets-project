const crypto = require('crypto');

function generateUid() {
  return crypto.randomBytes(12).toString('hex');
}

function Poll() {
  this.id = generateUid();
  this.adminId = generateUid();
  this.voteId = generateUid();
  this.adminUrl = '/admin/' + this.adminId;
  this.voterUrl = '/poll/' + this.voteId;
  this.pollTitle = null;
  this.pollClosed = false;
  this.stopTime = null;
  this.choices = [];
  this.votes = {};
}


module.exports = Poll;
