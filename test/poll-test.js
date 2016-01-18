const Poll = require('../lib/poll');
const assert = require('chai').assert;

var poll = new Poll({
  pollTitle: 'mypole',
  choices: ['choice1', 'choice2', 'choice3']
});

describe('Poll', function() {
  it('exists', function() {
    assert(poll);
  });

  it('has an id', function() {
    assert(poll.id);
  });

  it('has an adminUrl', function() {
    assert(poll.adminUrl);
  });

  it('has a voter url', function() {
    assert(poll.voterUrl);
  });

  it('has different voter and admin urls', function() {
    assert.notEqual(poll.adminUrl, poll.voterUrl)
  });

  it('two poles will have unique ids', function() {
    var poll2 = new Poll({ pollTitle: 'secondpoll', choices: [1, 2] });
    assert.notEqual(poll.id, poll2.id)
  });

  it('has a title once the form is filled', function() {
    assert.equal('mypole', poll.pollTitle)
  });

  it('adds choices to its choice array', function() {
    assert.equal('choice1', poll.choices[0])
  });

  it('starts off with a pollClosed value of false', function() {
    assert.equal(false, poll.pollClosed)
  });

  it('starts off with an empty votes hash to store responses', function()  {
    assert.deepEqual({}, poll.votes)
  });

  it('starts off witha a showVoteResults property set to false', function() {
    assert.equal(false, poll.showVoteResults)
  });
});

