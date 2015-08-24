var base = require('all-your-base');

var decToHex = base.decToHex
  , hexToDec = base.hexToDec;

/**
 * Superclass for:
 * - Decimal time
 * - Hexadecimal time
 */
var Time = {
  ssInHH: function() {
    return this.ssInMM * this.mmInHH; 
  },
  ssInDD: function() {
    return this.ssInMM * this.mmInHH * this.hhInDD;
  },
  mmInDD: function() {
    return this.mmInHH * this.hhInDD;
  },
  //pseuDegrees: function(unit) {
  //  return unit / Math.PI;
  //},
  /**
   * Return array of object's **own** enumerable properties
   */
  logEnumProps: function() {
    return (Object.keys(this));
  },
  /**
   * Return array of object's **own** enumerable & non-enumerable properties
   */
  logAllProps: function() {
    return (Object.getOwnPropertyNames(this));
  },
};

// Get number of hours from the number of seconds
Time.getHHFromSS = function(ss) {
  return ss / this.ssInHH();
};
// Get number of days from the number of minutes
Time.getDDFromMM = function(mm) {
  return mm / this.mmInDD();
};
// Get number of days from the number of seconds
Time.getDDFromSS = function(ss) {
  return ss / this.ssInDD();
};

/** 
 * Extract number of seconds in an array from a time as a string.
 * ie: if the time is 12:30:30 PM, then the array you'd get in return is:
 * [43200, 1800, 30] because there are:
 *   - 43200 seconds adding up to 12 hours
 *   - 1800 seconds adding up to 30 minutes
 *   - 30 seconds adding up to 30 seconds
 * Delimits by a non-digit, such as: ':' (colon) or '_' (underscore)
 * @param timeStr, a string in this format: /\d{1,}/g
 * @param baseObj, (Optional) DecTime or HexTime obj to compare input to
 * @return, an array collecting number of decimal seconds
 */
Time.collectSeconds = function(timeStr, baseObj) {
  baseObj = typeof baseObj === "undefined" ?
    this :
    baseObj;
  var temp = timeStr.split(/\D/g);
  return [
    parseInt(temp[0] * baseObj.ssInHH()),
    parseInt(temp[1] * baseObj.ssInMM),
    parseInt(temp[2])
  ];
};

/** 
 * For each unit of time ([
 *   seconds with respect to whole hours,
 *   seconds with respect to whole minutes,
 *   seconds with respect to whole seconds
 * ]),
 * get percentage of time (decimal percentage) that has passed since midnight.
 * Each result is rounded to two-hundredths of a percent.
 * Use Time#collectSeconds to get an array of seconds from a time string.
 * @param timeArr, array returned by Time#collectSeconds
 * @return, array
 */
Time.getPortions = function(timeArr) {
  var hh = (timeArr[0] / this.ssInDD());
  var mm = (timeArr[1] / this.ssInHH());
  var ss = (timeArr[2] / this.ssInMM);
  return [hh, mm, ss].map(function(val) {
    return parseFloat(val.toFixed(4));
  });
};

/**
 * Get the number of seconds that have passed since midnight. The units will
 * be in the units of the object that called the method.
 * @param timeStr, a pre-processed time string in this format: ^(\d+\S){3}
 * @return, the number of seconds so far in the day
 */
Time.currentSecInDay = function(timeStr) {
  var baseObj = typeof baseObj === "undefined" ?
    this :
    baseObj;
  var temp = timeStr.split(/\W/g);
  return temp[0] * baseObj.ssInHH() +
    temp[1] * baseObj.ssInMM +
    temp[2] * 1;
};

/**
 * HexTime object, time based on hexadecimal units
 * 16 seconds in a minute, 256 minutes in an hour, 16 hours in a day.
 * Inherits some methods from the Time object
 */
var HexTime = Object.create(Time, {
  base: {value: 16, enumerable: true},
  ssInMM: {value: 16, enumerable: true},
  mmInHH: {value: 256, enumerable: true},
  hhInDD: {value: 16, enumerable: true},
});

/**
 * DecTime object, this is "everytime time" where there are
 * 60 seconds in a minute, 60 minutes in an hour, 24 hours in a day.
 * Inherits some methods from the Time object
 */
var DecTime = Object.create(Time, {
  base: {value: 10, enumerable: true},
  ssInMM: {value: 60, enumerable: true},
  mmInHH: {value: 60, enumerable: true},
  hhInDD: {value: 24, enumerable: true},
  secondsSinceMidnight: {
    value: function (t) {
      var hh = parseInt(t.substr(0,2) * (this.ssInMM * this.mmInHH));
      var mm = parseInt(t.substr(2,2) * (this.ssInMM));
      var ss = parseInt(t.substr(4,2));
      return hh + mm + ss;
    }
  }
});

/**
 * Converts decimal time to hexadecimal time
 * @param timeStr, the time in DecTime format
 * @return, the time in hexadecimal format
 */
HexTime.convertToHexTime = function(timeStr) {
  var portions = DecTime.getPortions(
    DecTime.collectSeconds(timeStr, DecTime),
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
  var decSecInDD = DecTime.ssInDD()
    , hexSecInDD = HexTime.ssInDD();

  // get a decimal sum of all the seconds in the array,
  // then divide that sum by number of decimal seconds in a decimal day,
  // then multiply that quotient by # of hexadecimal seconds in a hexadecimal day.
  var timeArr = HexTime.collectSeconds(timeStr, DecTime);
  timeArr = timeArr.reduce(function(sum, val) {
    return sum + val;
  }, 0);
  timeArr /= decSecInDD;
  timeArr *= hexSecInDD;
  return Math.floor(timeArr);
};

/**
 * Correlation methods
 * Mapping a hexadecimal unit of time to a decimal unit of time, and visa-versa.
 * - second to second
 * - minute to minute
 * - hour to hour
 */

HexTime.getDecSec = function(hexSec) {
  var decBase = DecTime.ssInDD();
  var hexBase = Math.pow(HexTime.base, 4);
  return hexSec * ( decBase / hexBase ).toFixed(3);
};
HexTime.getDecMin = function(hexMin) {
  var decBase = DecTime.mmInDD();
  var hexBase = Math.pow(HexTime.base, 3);
  return hexMin * ( decBase / hexBase ).toFixed(3);
};
HexTime.getDecHour = function(hexHour) {
  var decBase = DecTime.hhInDD;
  var hexBase = Math.pow(HexTime.base, 1);
  return hexHour * ( decBase / hexBase ).toFixed(3);
};
DecTime.getHexSec = function(decSec) {
  var hexBase = Math.pow(HexTime.base, 4);
  var decBase = DecTime.ssInDD();
  return (decSec * ( hexBase / decBase )).toFixed(3);
};
DecTime.getHexMin = function(decMin) {
  var hexBase = Math.pow(HexTime.base, 3);
  var decBase = DecTime.mmInDD();
  return (decMin * ( hexBase / decBase )).toFixed(3);
};
DecTime.getHexHour = function(decHour) {
  var hexBase = Math.pow(HexTime.base, 1);
  var decBase = DecTime.hhInDD;
  return (decHour * ( hexBase / decBase )).toFixed(3);
};

module.exports = {
  Time: Time,
  HexTime: HexTime,
  DecTime: DecTime
};
