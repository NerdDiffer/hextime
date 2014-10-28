var assert = require('assert')
  , TimeObj = require('../dev/TimeObj')
  , tools = require('../dev/tools')
  , base = require('all-your-base');

var decToHex = base.decToHex
  , hexToDec = base.hexToDec
  , preProcess = tools.preProcess
  , splitTime = tools.splitTime;

var basicTimeObj = TimeObj.Time
  , hexTime = TimeObj.HexTime
  , decTime = TimeObj.DecTime;

var propsFromTimeObj = 'ssInHH,ssInDD,mmInDD,logEnumProps,logAllProps,getHHFromSS,getDDFromMM,getDDFromSS,collectSeconds,getPortions,currentSecInDay';

describe('Time', function() {
  it("should provide these basic properties", function() {
    assert.equal(propsFromTimeObj, Object.keys(basicTimeObj)); 
  });
});
describe('HexTime', function() {
  it("should have a property describing it as base-16", function() {
    assert.equal(16, hexTime.base); 
  });
  it("should have these counts of minutes to seconds to hours", function() {
    assert.equal(16, hexTime.ssInMM); 
    assert.equal(256, hexTime.mmInHH); 
    assert.equal(16, hexTime.hhInDD); 
    assert.equal(4096, hexTime.ssInHH());
    assert.equal(65536, hexTime.ssInDD());
    assert.equal(4096, hexTime.mmInDD());
  });
  describe('#collectSeconds', function() {
    it("should parse a time, passed in as a string, and return number of seconds that add up to the hour, add up to minutes, add up to seconds", function() {
      var sampleTime1 = '08_128_08';
      var sampleTime2 = '15_240_15';
      assert.equal(
        [32768,2048,8].toString(), 
        hexTime.collectSeconds(sampleTime1)
      );
      assert.equal(
        [61440, 3840, 15].toString(), 
        hexTime.collectSeconds(sampleTime2)
      );
    });
  });
  describe('#getPortions', function() {
    var sampleTime1 = [61440, 3840, 15]; 
    var sampleTime2 = [0, 0, 0]; 
    var sampleTime3 = [32768, 2048, 8]; 
    it("should return array describing how much time per hours, minutes, or seconds have passed until the respective time units (hours, minutes, seconds) increments itself", function() {
      assert.equal(
        [0.9375, 0.9375, 0.9375].toString(), 
        hexTime.getPortions(sampleTime1)
      );
      assert.equal([0,0,0].toString(), hexTime.getPortions(sampleTime2));
      assert.equal([0.50,0.50,0.50].toString(), hexTime.getPortions(sampleTime3));
    });
  });
  describe('#convertToHexTime', function() {
    var str1 = '12:00:00';
    var str2 = '6:30:00';
    it('should be passed a decimal time string & return its equivalent in hexadecimal time', function() {
      assert.equal('8_0_0', hexTime.convertToHexTime(str1));
      assert.equal('4_8_0', hexTime.convertToHexTime(str2));
    }); 
  });
  describe('#getHexSum', function() {
    var str1 = '12:00:00';
    var str2 = '06:00:00';
    var str3 = '17:29:00';
    it('should be passed a decimal time & return a sum of # of seconds in a hexadecimal day', function() {
      assert.equal(32768, hexTime.getHexSum(str1)); 
      assert.equal(16384, hexTime.getHexSum(str2)); 
      //assert.equal(48000, hexTime.getHexSum(str3)); 
    });
  });
  describe('#currentSecInDay', function() {
    var str1 = '8:0:0';
    var str2 = '00:00:00';
    var str3 = '15:255:15';
    it('should be passed a hexadecimal time & sum up the time in hexadecimal seconds', function() {
      assert.equal(32768, hexTime.currentSecInDay(str1));
      assert.equal(0, hexTime.currentSecInDay(str2));
      assert.equal(65535, hexTime.currentSecInDay(str3));
    });
  });
  describe('relating hexadecimal time units to other hexadecimal time units', function() {
    describe('#getHHFromSS', function() {
      it("should show that some arbitrary number of passed-in decimally-based hexSeconds are proportional to an amount of decimally-based hexHours", function() {
        assert.equal(1, hexTime.getHHFromSS(4096)); 
        assert.equal(2, hexTime.getHHFromSS(8192)); 
        assert.equal(0.5, hexTime.getHHFromSS(2048)); 
        assert.equal(16, hexTime.getHHFromSS(65536)); 
      });
    });
    describe('#getDDFromMM', function() {
      it("should show that some arbitrary number of passed-in decimally-based hexMinutes are proportional to an amount of decimally-based hexDays", function() {
        assert.equal(1, hexTime.getDDFromMM(4096)); 
        assert.equal(0.5, hexTime.getDDFromMM(2048)); 
        assert.equal(2, hexTime.getDDFromMM(8192)); 
        assert.equal(2.5, hexTime.getDDFromMM(10240)); 
        assert.equal(16, hexTime.getDDFromMM(65536)); 
      });
    });
    describe('#getDDFromSS', function() {
      it("should show that some arbitrary number of passed-in decimally-based hexSeconds are proportional to an amount of decimally-based hexDays", function() {
        assert.equal(1, hexTime.getDDFromSS(65536));
      });
    });
  });
  describe('correlating hexadecimal time units to decimal time units', function() {
    describe("#getDecSec", function() {
      it("should be passed a hexSecond & return a decSecond", function() {
        assert.equal(1.318, hexTime.getDecSec(1));
        assert.equal(2.636, hexTime.getDecSec(2));
      });
    });
    describe("#getDecMin", function() {
      it("should be passed a hexMinute & return a decMinute", function() {
        assert.equal(0.352, hexTime.getDecMin(1));
        assert.equal(0.704, hexTime.getDecMin(2));
      });
    });
    describe("#getDecHour", function() {
      it("should be passed a hexHour & return a decHour", function() {
        assert.equal(1.500, hexTime.getDecHour(1));
        assert.equal(3.000, hexTime.getDecHour(2));
        assert.equal(24.000, hexTime.getDecHour(16));
      });
    });
  });
});

describe('DecTime', function() {
  it("should have a property describing it as base-10", function() {
    assert.equal(10, decTime.base); 
  });
  it("should have these counts of minutes to seconds to hours", function() {
    assert.equal(60, decTime.ssInMM); 
    assert.equal(60, decTime.mmInHH); 
    assert.equal(24, decTime.hhInDD); 
    assert.equal(3600, decTime.ssInHH());
    assert.equal(86400, decTime.ssInDD());
    assert.equal(1440, decTime.mmInDD());
  });
  describe('#collectSeconds', function() {
    it("should parse a time, passed in as a string, and return number of seconds that add up to the hour, add up to minutes, add up to seconds", function() {
      var sampleTime1 = '18:32:47';
      var sampleTime2 = '23:59:59';
      assert.equal(
        [64800, 1920, 47].toString(), 
        decTime.collectSeconds(sampleTime1)
      );
      assert.equal(
        [82800, 3540, 59].toString(), 
        decTime.collectSeconds(sampleTime2)
      );
    });
  });
  describe('#getPortions', function() {
    var sampleTime1 = [64800, 1920, 47]; 
    var sampleTime2 = [0, 0, 0]; 
    var sampleTime3 = [43200, 1800, 30]; 
    it("should return array describing how much time per hours, minutes, or seconds have passed until the respective time units (hours, minutes, seconds) increments itself", function() {
      assert.equal(
        [0.75, 0.5333, 0.7833].toString(), 
        decTime.getPortions(sampleTime1)
      );
      assert.equal([0,0,0].toString(), decTime.getPortions(sampleTime2));
      assert.equal([0.50,0.50,0.50].toString(), decTime.getPortions(sampleTime3));
    });
  });
  describe('#currentSecInDay', function() {
    var str1 = '15:06:36';
    var str2 = '00:00:00';
    var str3 = '23:59:59';
    it('should sum up the time in seconds', function() {
      assert.equal(54396, decTime.currentSecInDay(str1));
      assert.equal(0, decTime.currentSecInDay(str2));
      assert.equal(86399, decTime.currentSecInDay(str3));
    });
  });
  describe('relating decimal units to other decimal units', function() {
    describe('#getHHFromSS', function() {
      it("should show that some arbitrary number of passed-in decimally-based decSeconds are proportional to an amount of decimally-based decHours", function() {
        assert.equal(1, decTime.getHHFromSS(3600)); 
        assert.equal(2, decTime.getHHFromSS(7200)); 
        assert.equal(1.5, decTime.getHHFromSS(5400)); 
      });
    });
    describe('#getDDFromMM', function() {
      it("should show that some arbitrary number of passed-in decimally-based decMinutes are proportional to an amount of decimally-based decDays", function() {
        assert.equal(1, decTime.getDDFromMM(1440)); 
        assert.equal(2, decTime.getDDFromMM(2880)); 
        assert.equal(1.5, decTime.getDDFromMM(2160)); 
      });
    });
    describe('#getDDFromSS', function() {
      it("should show that some arbitrary number of passed-in decimally-based decSeconds are proportional to an amount of decimally-based decDays", function() {
        assert.equal(1, decTime.getDDFromSS(86400)); 
        assert.equal(0.5, decTime.getDDFromSS(43200)); 
        assert.equal(1.5, decTime.getDDFromSS(129600)); 
      });
    });
  });
  describe('correlating decimal time units to hexadecimal time units', function() {
    describe("#getHexSec", function() {
      it("should be passed a decSecond & return hexSeconds", function() {
        assert.equal(0.759, decTime.getHexSec(1));
        assert.equal(45.511, decTime.getHexSec(60));
        assert.equal(65536, decTime.getHexSec(86400));
      });
    });
    describe("#getHexMin", function() {
      it("should be passed a decMinute & return hexMinutes", function() {
        assert.equal(2.844, decTime.getHexMin(1));
        assert.equal(170.667, decTime.getHexMin(60));
        assert.equal(4096, decTime.getHexMin(1440));
      });
    });
    describe("#getHexHour", function() {
      it("should be passed a decHour & return hexHours", function() {
        assert.equal(0.667, decTime.getHexHour(1));
        assert.equal(8, decTime.getHexHour(12));
        assert.equal(16, decTime.getHexHour(24));
      });
    });
  });
});
