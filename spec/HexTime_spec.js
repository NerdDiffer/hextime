var assert = require('assert');

var hexTime = require('..').HexTime;

describe('HexTime', function() {

  describe('Time units & proportions', function() {
    it('has a property describing it as base-16', function() {
      assert.equal(hexTime.base, 16);
    });
    it('has 16 (base-10) seconds in 1 minute', function() {
      assert.equal(hexTime.ssInMM, 16);
    });
    it('has 256 (base-10) minutes in 1 hour', function() {
      assert.equal(hexTime.mmInHH, 256);
    });
    it('has 16 (base-10) hours in 1 day', function() {
      assert.equal(hexTime.hhInDD, 16);
    });
    it('has 4096 (base-10) seconds in 1 hour', function() {
      assert.equal(hexTime.ssInHH(), 4096);
    });
    it('has 65536 (base-10) seconds in 1 day', function() {
      assert.equal(hexTime.ssInDD(), 65536);
    });
    it('has 4096 (base-10) minutes in 1 day', function() {
      assert.equal(hexTime.mmInDD(), 4096);
    });
  });

  describe('.collectSeconds', function() {
    var sampleTime1 = '08_128_08';
    var sampleTime2 = '15_240_15';

    it('should parse a time, passed in as a string, and return number of seconds that add up to the hour, add up to minutes, add up to seconds', function() {
      assert.deepEqual(
        hexTime.collectSeconds(sampleTime1),
        [32768,2048,8]
      );

      assert.deepEqual(
        hexTime.collectSeconds(sampleTime2),
        [61440, 3840, 15]
      );
    });
  });

  describe('.getPortions', function() {
    var sampleTime1 = [61440, 3840, 15];
    var sampleTime2 = [0, 0, 0];
    var sampleTime3 = [32768, 2048, 8];

    it('should return array describing how much time per hours, minutes, or seconds have passed until the respective time units (hours, minutes, seconds) increments itself', function() {
      assert.deepEqual(
        hexTime.getPortions(sampleTime1),
        [0.9375, 0.9375, 0.9375]
      );
      assert.deepEqual(
        hexTime.getPortions(sampleTime2),
        [0, 0, 0]
      );
      assert.deepEqual(
        hexTime.getPortions(sampleTime3),
        [0.50, 0.50, 0.50]
      );
    });
  });

  describe('.convertToHexTime', function() {
    var str1 = '12:00:00';
    var str2 = '6:30:00';

    it('should be passed a time string (in regular time) & return its equivalent in hexadecimal time', function() {
      assert.equal(
        hexTime.convertToHexTime(str1),
        '8_0_0'
      );
      assert.equal(
        hexTime.convertToHexTime(str2),
        '4_8_0'
      );
    });
  });

  describe('.getHexSum', function() {
    var str1 = '12:00:00';
    var str2 = '06:00:00';
    var str3 = '17:29:00';

    it('should be passed a regular time & return the number of seconds in a hexadecimal day', function() {
      assert.equal(hexTime.getHexSum(str1), 32768);
      assert.equal(hexTime.getHexSum(str2), 16384);
      //assert.equal(48000, hexTime.getHexSum(str3));
    });
  });

  describe('.currentSecInDay', function() {
    var str1 = '8:0:0';
    var str2 = '00:00:00';
    var str3 = '15:255:15';

    it('should be passed a hexadecimal time & sum up the time in hexadecimal seconds', function() {
      assert.equal(hexTime.currentSecInDay(str1), 32768);
      assert.equal(hexTime.currentSecInDay(str2), 0);
      assert.equal(hexTime.currentSecInDay(str3), 65535);
    });
  });

  describe('Relating hexadecimal time units to other hexadecimal time units', function() {

    describe('.getHHFromSS', function() {
      it('converts hexadecimal seconds to hexadecimal hours', function() {
        assert.equal(hexTime.getHHFromSS(4096), 1);
        assert.equal(hexTime.getHHFromSS(8192), 2);
        assert.equal(hexTime.getHHFromSS(2048), 0.5);
        assert.equal(hexTime.getHHFromSS(65536), 16);
      });
    });

    describe('.getDDFromMM', function() {
      it('converts hexadecimal minutes to hexadecimal days', function() {
        assert.equal(hexTime.getDDFromMM(4096), 1);
        assert.equal(hexTime.getDDFromMM(2048), 0.5);
        assert.equal(hexTime.getDDFromMM(8192), 2);
        assert.equal(hexTime.getDDFromMM(10240), 2.5);
        assert.equal(hexTime.getDDFromMM(65536), 16);
      });
    });

    describe('.getDDFromSS', function() {
      it('converts hexadecimal seconds to hexadecimal days', function() {
        assert.equal(hexTime.getDDFromSS(65536), 1);
      });
    });

  });

});
