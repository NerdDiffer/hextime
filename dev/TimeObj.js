var base = require('all-your-base');

var decToHex = base.decToHex
  , hexToDec = base.hexToDec;

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
  logEnumProps: function() {
    return (Object.keys(this));
  },
  logAllProps: function() {
    return (Object.getOwnPropertyNames(this));
  },
};
Time.getHHFromSS = function(ss) {
  return ss / this.ssInHH();
};
Time.getDDFromMM = function(mm) {
  return mm / this.mmInDD();
};
Time.getDDFromSS = function(ss) {
  return ss / this.ssInDD();
};
/** 
 * store number of sec/day, sec/hour, sec/min in an array
 * ex: 18:32:47 is [64800, 1920, 47]
 * delimited by a non-digit, such as: ':' (colon) or '_' (underscore)
 * @param timeStr, a string in this format: /\d{1,}/g
 * @param baseObj, (Optional parameter) DecTime or HexTime obj to compare input to
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
 * for each unit of time (hours, minutes, seconds) 
 * get percentage (decimal) of time passed
 * based on num of seconds passed since midnight, 
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
 * @param timeStr, preProcessed time string in this format: ^(\d+\S){3}
 * @return, the number of seconds so far in the day
 */
Time.currentSecInDay = function(timeStr, baseObj) {
  baseObj = typeof baseObj === "undefined" ?
    this :
    baseObj;
  var temp = timeStr.split(/\W/g);
  return temp[0] * baseObj.ssInHH() +
    temp[1] * baseObj.ssInMM +
    temp[2] * 1;
};
var HexTime = Object.create(Time, {
  base: {value: 16, enumerable: true},
  ssInMM: {value: 16, enumerable: true},
  mmInHH: {value: 256, enumerable: true},
  hhInDD: {value: 16, enumerable: true},
});
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
 * collects an array of seconds, on a decimal basis
 * then sums it up, again on decimal basis
 * divides that sum by # of decimal seconds in a decimal day
 * then multiplies that quotient by number of hexSec in a hexadecimal day
 * floors result of that operation to nearest integer
 * @param timeStr, decimal time as a string
 * @return, number of seconds in a hexadecimal day
 */
HexTime.getHexSum = function(timeStr) {
  var decSecInDD = DecTime.ssInDD()
    , hexSecInDD = HexTime.ssInDD();
  return Math.floor( (HexTime.collectSeconds(timeStr, DecTime)
    .reduce(function(sum, val) {
      return sum + val; 
    }, 0) / decSecInDD) *
    hexSecInDD
  );
};
/* Correlation methods */

// hexadecimal unit to complimentary decimal unit
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

// decimal unit to complimentary hexadecimal unit
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
