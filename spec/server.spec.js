import babelPolyfill from 'babel-polyfill';
import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import src from '../src/index.js';

var expect = require ('chai').expect;

chai.use(chaiHttp);

var waitForThen = function (test, cb) {
  setTimeout(function() {
    test() ? cb.apply(this) : waitForThen(test, cb);
  }, 5);
};

describe('Server', function() {

  describe('server has GET response', function() {
    it('should return initial page', function() {
      chai.request('http://localhost:3000')
        .get('')
        .end(function(err, res){
          res.should.have.status(200);
        });
      }
    );

    it('Should 404 when asked for a nonexistent route', () => {
      chai.request('http://localhost:3000')
        .get('/arglebargle')
        waitForThen(
          () => { res._ended; },
          () => {
            expect(res._responseCode).to.equal(404);
          }
        );
      }
    );
  })

  xdescribe('server has POST', function() {
    it('should return true', function() {
      chai.request('http://localhost:3000')
        .get('')
        .end(function(err, res){
          res.should.have.status(200);
        });
      }
    );
  })
});