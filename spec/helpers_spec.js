var assert = require('assert')
  , helpers = require('../lib/helpers');

var preProcess = helpers.preProcess;

describe('Helper methods', function() {

  var date = new Date(2014,10,27,15,06,36);

  describe('preProcess', function() {

    context('first parameter', function() {
      it('expects a Date object as first parameter', function() {
        assert.equal(date.constructor, Date);
      });
    });

    context('optional 2nd parameter', function() {

      it('when passed nothing, will delimit by `:`', function() {
        assert.equal(
          preProcess(date),
          '15:06:36'
        );
      });

      it('accepts an optional parameter as delimiter', function() {
        assert.equal(
          preProcess(date, '_'),
          '15_06_36'
        );
      });

      it('also accepts an empty string', function() {
        assert.equal(
          preProcess(date, ''),
          '150636'
        );
      });
    });

    context('expected return values', function() {
      it('returns the first 8 characters of the time', function() {
        var now = new Date();
        assert.equal(
          preProcess(now),
          now.toTimeString().slice(0,8)
        );
      });

      it('returns the first 8 characters of the time', function() {
        assert.equal(
          preProcess(date),
          '15:06:36'
        );
      });
    });
  });

});
