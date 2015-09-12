var assert = require('assert');

var regTime = require('..').RegTime;

describe('RegTime', function() {

  describe('Time units & proportions', function() {
    it('has a property describing it as base-10', function() {
      assert.equal(10, regTime.base);
    });
    it('has 60 seconds in 1 minute', function() {
      assert.equal(regTime.ssInMM, 60);
    });
    it('has 60 minutes in 1 hour', function() {
      assert.equal(regTime.mmInHH, 60);
    });
    it('has 24 hours in 1 day', function() {
      assert.equal(regTime.hhInDD, 24);
    });
    it('has 3600 seconds in 1 hour', function() {
      assert.equal(regTime.ssInHH(), 3600);
    });
    it('has 86400 seconds in 1 day', function() {
      assert.equal(regTime.ssInDD(), 86400);
    });
    it('has 1440 minutes in 1 day', function() {
      assert.equal(regTime.mmInDD(), 1440);
    });
  });

  describe('#collectSeconds', function() {
    var sampleTime1 = '18:32:47';
    var sampleTime2 = '23:59:59';

    it('should parse a time and return a list of the number of seconds adding up to hours, number of seconds adding up to minutes and number of seconds', function() {
      assert.deepEqual(
        regTime.collectSeconds(sampleTime1),
        [64800, 1920, 47]
      );
      assert.deepEqual(
        regTime.collectSeconds(sampleTime2),
        [82800, 3540, 59]
      );
    });
  });

  describe('#getPortions', function() {
    var sampleTime1 = [64800, 1920, 47];
    var sampleTime2 = [0, 0, 0];
    var sampleTime3 = [43200, 1800, 30];

    it('should return array describing how much time per hours, minutes, or seconds have passed until the respective time units (hours, minutes, seconds) increments itself', function() {
      assert.deepEqual(
        regTime.getPortions(sampleTime1),
        [0.75, 0.5333, 0.7833]
      );
      assert.deepEqual(
        regTime.getPortions(sampleTime2),
        [0,0,0]
      );
      assert.deepEqual(
        regTime.getPortions(sampleTime3),
        [0.50,0.50,0.50]
      );
    });
  });

  describe('#currentSecInDay', function() {
    var str1 = '15:06:36';
    var str2 = '00:00:00';
    var str3 = '23:59:59';

    it('should sum up the time in seconds', function() {
      assert.equal(regTime.currentSecInDay(str1), 54396);
      assert.equal(regTime.currentSecInDay(str2), 0);
      assert.equal(regTime.currentSecInDay(str3), 86399);
    });
  });

  describe('relating time units to other regular time units', function() {
    describe('#getHHFromSS', function() {
      it('converts regular seconds to regular hours', function() {
        assert.equal(regTime.getHHFromSS(3600), 1);
        assert.equal(regTime.getHHFromSS(7200), 2);
        assert.equal(regTime.getHHFromSS(5400), 1.5);
      });
    });
    describe('#getDDFromMM', function() {
      it('converts regular minutes to regular days', function() {
        assert.equal(regTime.getDDFromMM(1440), 1);
        assert.equal(regTime.getDDFromMM(2880), 2);
        assert.equal(regTime.getDDFromMM(2160), 1.5);
      });
    });
    describe('#getDDFromSS', function() {
      it('converts regular seconds to regular days', function() {
        assert.equal(regTime.getDDFromSS(86400), 1);
        assert.equal(regTime.getDDFromSS(43200), 0.5);
        assert.equal(regTime.getDDFromSS(129600), 1.5);
      });
    });
  });
});
