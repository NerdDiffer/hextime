var Time = require('./Time.js');
var RegTime = require('./RegTime.js');

/**
 * HexTime object, time based on hexadecimal units
 * 16 seconds in a minute, 256 minutes in an hour, 16 hours in a day.
 * Inherits some methods from the Time object
 */
var HexTime = Object.create(Time, {
  base:   {value: 16, enumerable: true},
  ssInMM: {value: 16, enumerable: true},
  mmInHH: {value: 256, enumerable: true},
  hhInDD: {value: 16, enumerable: true},
});

/**
 * Converts decimal time to hexadecimal time
 * @param timeStr, the time in RegTime format
 * @return, the time in hexadecimal format
 */
HexTime.convertToHexTime = function(timeStr) {
  var portions = RegTime.getPortions(
    RegTime.collectSeconds(timeStr, RegTime),
    HexTime
  );
  return [
    portions[0] * HexTime.hhInDD / 1,
    portions[1] * HexTime.ssInMM,
    portions[2] * 1
  ].join('_');
};

/**
 * Collect an array of seconds (based on decimal seconds) and return a sum.
 * @param timeStr, decimal time as a string
 * @return, number of seconds in a hexadecimal day
 */
HexTime.getHexSum = function(timeStr) {
  var decSecInDD = RegTime.ssInDD()
    , hexSecInDD = HexTime.ssInDD();

  // get a decimal sum of all the seconds in the array,
  // then divide that sum by number of decimal seconds in a decimal day,
  // then multiply:
  //   the quotient by the number of hexadecimal seconds in a hexadecimal day.
  var timeArr = HexTime.collectSeconds(timeStr, RegTime);
  timeArr = timeArr.reduce(function(sum, val) {
    return sum + val;
  }, 0);
  timeArr /= decSecInDD;
  timeArr *= hexSecInDD;
  return Math.floor(timeArr);
};

module.exports = HexTime;
