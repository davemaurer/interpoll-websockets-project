const PollRepository = require('../lib/pollRepository');
const assert = require('chai').assert;

var pollRepository = new PollRepository;

describe('PollRepository', function() {
  it('exists', function() {
    assert(pollRepository);
  });

  it('instantiates with a polls property', function() {
    assert(pollRepository.polls)
  });
});
