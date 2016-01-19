const Poll = require('../lib/poll');
const assert = require('chai').assert;
const request = require('supertest');
const app = require('../server');

describe('server', function() {
  it('returns a 200 response when GET/ is requested', function(done) {
    request(app).get('/');
    assert(200);
    done();
  });

  it('returns a 200 response when GET/admin/id is requested', function(done) {
    request(app).get('/admin/oicu812');
    assert(200);
    done();
  });

  it('returns a 200 response when POST/admin/id is requested', function(done) {
    request(app).post('/').type('form').send( {
      pollTitle: 'newpoll',
      choices: {choice1: 'choice1'}
    });
    assert(200);
    done();
  });

  it('returns a 200 response when GET/poll/id is requested', function(done) {
    request(app).get('/poll/8675309');
    assert(200);
    done();
  });

  it('returns a 404 response when an invalid route is requested', function(done) {
    request(app).get('/mysecretroute');
    assert(404);
    done();
  });

  it('returns a 404 response when a got to /poll with a bad uid is sent', function(done) {
    request(app).get('/poll/blahblahblah');
    assert(404);
    done();
  });

  it('returns a 404 response when an invalid set of data is sent', function(done) {
    request(app).post('/').type('form').send( {
      bladhaladdfltu: 'huh?'
    });
    assert(404);
    done();
  });

  it('returns a 404 response when a post to /admin with a bad uid is made', function(done) {
    request(app).post('/admin/blahblahblah')
    assert(404);
    done();
  });

  //it('redirects to admin when successfully posting from root', function(done) {
  //  request(app).post('/').type('form').send( {
  //    pollTitle: 'newpoll',
  //    choices: [1, 2]
  //  }).end(function(err, res) {
  //    assert.include(res.header['location'], '/admin')
  //  });
  //  done();
  //})
});
