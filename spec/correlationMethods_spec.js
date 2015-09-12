var assert = require('assert');
var index  = require('..');

describe('Correlation methods', function() {

  describe('fromRegular', function() {

    var fromRegular = index.fromRegular;

    describe('toHexSec', function() {
      it('converts a regular second to a hexadecimal second', function() {
        assert.equal(fromRegular.toHexSec(1), 0.759);
        assert.equal(fromRegular.toHexSec(60), 45.511);
        assert.equal(fromRegular.toHexSec(86400), 65536);
      });
    });

    describe('toHexMin', function() {
      it('converts a regular minute to a hexadecimal minute', function() {
        assert.equal(fromRegular.toHexMin(1), 2.844);
        assert.equal(fromRegular.toHexMin(60), 170.667);
        assert.equal(fromRegular.toHexMin(1440), 4096);
      });
    });

    describe('toHexHour', function() {
      it('converts a regular hour to a hexadecimal hour', function() {
        assert.equal(fromRegular.toHexHour(1), 0.667);
        assert.equal(fromRegular.toHexHour(12), 8);
        assert.equal(fromRegular.toHexHour(24), 16);
      });
    });

  });

  describe('fromHexadecimal', function() {

    var fromHexadecimal = index.fromHexadecimal;

    describe('toRegSec', function() {
      it('converts a hexadecimal second to a regular second', function() {
        assert.equal(fromHexadecimal.toRegSec(1), 1.318);
        assert.equal(fromHexadecimal.toRegSec(2), 2.636);
      });
    });

    describe('toRegMin', function() {
      it('converts a hexadecimal minute to a regular minute', function() {
        assert.equal(fromHexadecimal.toRegMin(1), 0.352);
        assert.equal(fromHexadecimal.toRegMin(2), 0.704);
      });
    });

    describe('toRegHour', function() {
      it('converts a hexadecimal hour to a regular hour', function() {
        assert.equal(fromHexadecimal.toRegHour(1), 1.5);
        assert.equal(fromHexadecimal.toRegHour(2), 3);
        assert.equal(fromHexadecimal.toRegHour(16), 24);
      });
    });

  });
});
