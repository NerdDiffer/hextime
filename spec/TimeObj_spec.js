var assert = require('assert')
  , TimeObj = require('..')
  , base = require('all-your-base');

var decToHex = base.decToHex
  , hexToDec = base.hexToDec;

var hexTime = TimeObj.HexTime
  , decTime = TimeObj.DecTime;

describe('HexTime', function() {

  it('should have a property describing it as base-16', function() {
    assert.equal(hexTime.base, 16);
  });

  it('should have these counts of minutes to seconds to hours', function() {
    assert.equal(hexTime.ssInMM, 16);
    assert.equal(hexTime.mmInHH, 256);
    assert.equal(hexTime.hhInDD, 16);
    assert.equal(hexTime.ssInHH(), 4096);
    assert.equal(hexTime.ssInDD(), 65536);
    assert.equal(hexTime.mmInDD(), 4096);
  });

  describe('#collectSeconds', function() {

    it('should parse a time, passed in as a string, and return number of seconds that add up to the hour, add up to minutes, add up to seconds', function() {
      var sampleTime1 = '08_128_08';
      var sampleTime2 = '15_240_15';

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

  describe('#getPortions', function() {
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

  describe('#convertToHexTime', function() {
    var str1 = '12:00:00';
    var str2 = '6:30:00';
    it('should be passed a decimal time string & return its equivalent in hexadecimal time', function() {
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

  describe('#getHexSum', function() {
    var str1 = '12:00:00';
    var str2 = '06:00:00';
    var str3 = '17:29:00';
    it('should be passed a decimal time & return a sum of # of seconds in a hexadecimal day', function() {
      assert.equal(hexTime.getHexSum(str1), 32768);
      assert.equal(hexTime.getHexSum(str2), 16384);
      //assert.equal(48000, hexTime.getHexSum(str3));
    });
  });

  describe('#currentSecInDay', function() {
    var str1 = '8:0:0';
    var str2 = '00:00:00';
    var str3 = '15:255:15';

    it('should be passed a hexadecimal time & sum up the time in hexadecimal seconds', function() {
      assert.equal(hexTime.currentSecInDay(str1), 32768);
      assert.equal(hexTime.currentSecInDay(str2), 0);
      assert.equal(hexTime.currentSecInDay(str3), 65535);
    });
  });

  describe('relating hexadecimal time units to other hexadecimal time units', function() {

    describe('#getHHFromSS', function() {
      it("should show that some arbitrary number of passed-in decimally-based hexSeconds are proportional to an amount of decimally-based hexHours", function() {
        assert.equal(hexTime.getHHFromSS(4096), 1);
        assert.equal(hexTime.getHHFromSS(8192), 2);
        assert.equal(hexTime.getHHFromSS(2048), 0.5);
        assert.equal(hexTime.getHHFromSS(65536), 16);
      });
    });

    describe('#getDDFromMM', function() {
      it("should show that some arbitrary number of passed-in decimally-based hexMinutes are proportional to an amount of decimally-based hexDays", function() {
        assert.equal(hexTime.getDDFromMM(4096), 1);
        assert.equal(hexTime.getDDFromMM(2048), 0.5);
        assert.equal(hexTime.getDDFromMM(8192), 2);
        assert.equal(hexTime.getDDFromMM(10240), 2.5);
        assert.equal(hexTime.getDDFromMM(65536), 16);
      });
    });

    describe('#getDDFromSS', function() {
      it("should show that some arbitrary number of passed-in decimally-based hexSeconds are proportional to an amount of decimally-based hexDays", function() {
        assert.equal(hexTime.getDDFromSS(65536), 1);
      });
    });

  });

  describe('correlating hexadecimal time units to decimal time units', function() {
    describe("#getDecSec", function() {
      it("should be passed a hexSecond & return a decSecond", function() {
        assert.equal(hexTime.getDecSec(1), 1.318);
        assert.equal(hexTime.getDecSec(2), 2.636);
      });
    });
    describe("#getDecMin", function() {
      it("should be passed a hexMinute & return a decMinute", function() {
        assert.equal(hexTime.getDecMin(1), 0.352);
        assert.equal(hexTime.getDecMin(2), 0.704);
      });
    });
    describe("#getDecHour", function() {
      it("should be passed a hexHour & return a decHour", function() {
        assert.equal(hexTime.getDecHour(1), 1.5);
        assert.equal(hexTime.getDecHour(2), 3);
        assert.equal(hexTime.getDecHour(16), 24);
      });
    });
  });
});

describe('DecTime', function() {

  it("should have a property describing it as base-10", function() {
    assert.equal(10, decTime.base);
  });

  it("should have these counts of minutes to seconds to hours", function() {
    assert.equal(decTime.ssInMM, 60);
    assert.equal(decTime.mmInHH, 60);
    assert.equal(decTime.hhInDD, 24);
    assert.equal(decTime.ssInHH(), 3600);
    assert.equal(decTime.ssInDD(), 86400);
    assert.equal(decTime.mmInDD(), 1440);
  });

  describe('#collectSeconds', function() {

    it('should parse a time and return a list of the number of seconds adding up to hours, number of seconds adding up to minutes and number of seconds', function() {
      var sampleTime1 = '18:32:47';
      var sampleTime2 = '23:59:59';
      assert.deepEqual(
        decTime.collectSeconds(sampleTime1),
        [64800, 1920, 47]
      );
      assert.deepEqual(
        decTime.collectSeconds(sampleTime2),
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
        decTime.getPortions(sampleTime1),
        [0.75, 0.5333, 0.7833]
      );
      assert.deepEqual(
        decTime.getPortions(sampleTime2),
        [0,0,0]
      );
      assert.deepEqual(
        decTime.getPortions(sampleTime3),
        [0.50,0.50,0.50]
      );
    });
  });

  describe('#currentSecInDay', function() {
    var str1 = '15:06:36';
    var str2 = '00:00:00';
    var str3 = '23:59:59';

    it('should sum up the time in seconds', function() {
      assert.equal(decTime.currentSecInDay(str1), 54396);
      assert.equal(decTime.currentSecInDay(str2), 0);
      assert.equal(decTime.currentSecInDay(str3), 86399);
    });
  });

  describe('relating decimal units to other decimal units', function() {
    describe('#getHHFromSS', function() {
      it("should show that some arbitrary number of passed-in decimally-based decSeconds are proportional to an amount of decimally-based decHours", function() {
        assert.equal(decTime.getHHFromSS(3600), 1);
        assert.equal(decTime.getHHFromSS(7200), 2);
        assert.equal(decTime.getHHFromSS(5400), 1.5);
      });
    });
    describe('#getDDFromMM', function() {
      it("should show that some arbitrary number of passed-in decimally-based decMinutes are proportional to an amount of decimally-based decDays", function() {
        assert.equal(decTime.getDDFromMM(1440), 1);
        assert.equal(decTime.getDDFromMM(2880), 2);
        assert.equal(decTime.getDDFromMM(2160), 1.5);
      });
    });
    describe('#getDDFromSS', function() {
      it("should show that some arbitrary number of passed-in decimally-based decSeconds are proportional to an amount of decimally-based decDays", function() {
        assert.equal(decTime.getDDFromSS(86400), 1);
        assert.equal(decTime.getDDFromSS(43200), 0.5);
        assert.equal(decTime.getDDFromSS(129600), 1.5);
      });
    });
  });
  describe('correlating decimal time units to hexadecimal time units', function() {

    describe("#getHexSec", function() {
      it("should be passed a decSecond & return hexSeconds", function() {
        assert.equal(decTime.getHexSec(1), 0.759);
        assert.equal(decTime.getHexSec(60), 45.511);
        assert.equal(decTime.getHexSec(86400), 65536);
      });
    });

    describe("#getHexMin", function() {
      it("should be passed a decMinute & return hexMinutes", function() {
        assert.equal(decTime.getHexMin(1), 2.844);
        assert.equal(decTime.getHexMin(60), 170.667);
        assert.equal(decTime.getHexMin(1440), 4096);
      });
    });

    describe("#getHexHour", function() {
      it("should be passed a decHour & return hexHours", function() {
        assert.equal(decTime.getHexHour(1), 0.667);
        assert.equal(decTime.getHexHour(12), 8);
        assert.equal(decTime.getHexHour(24), 16);
      });
    });

  });
});
