/**
 * Superclass for:
 * - Regular time
 * - Hexadecimal time
 */
var Time = {
  // Seconds in an hour
  ssInHH: function() {
    return this.ssInMM * this.mmInHH;
  },

  // Seconds in a day
  ssInDD: function() {
    return this.ssInMM * this.mmInHH * this.hhInDD;
  },

  // Minutes in a day
  mmInDD: function() {
    return this.mmInHH * this.hhInDD;
  },

  // Return array of object's **own** enumerable properties
  logEnumProps: function() {
    return (Object.keys(this));
  },

  // Return array of object's **own** enumerable & non-enumerable properties
  logAllProps: function() {
    return (Object.getOwnPropertyNames(this));
  }
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
 * @param baseObj, (Optional) RegTime or HexTime obj to compare input to
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

module.exports = Time;
