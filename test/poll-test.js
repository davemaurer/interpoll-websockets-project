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
  })
});

