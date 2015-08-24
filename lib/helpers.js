/**
 * Extract the time out of a Javascript Date object.
 * pass in: 'Mon Oct 27 2014 15:06:36 GMT-0700 (PDT)'
 * outputs: '15:06:36'
 * @param dateObj, Date: regular javascript date object
 * @param del, (optional), delimiter to separate hh:mm:ss. default is ':'
 * @return, the time as a string
 */
var preProcess = function(dateObj, del) {
  del = typeof del === "undefined" ? ":" : del;
  var timeStr = dateObj.toTimeString();
  return timeStr
    .match(/^(\d+\S){3}/g)
    .toString()
    .split(/\W/)
    .join(del); 
};

/**
 * split a string into an array & apply a function to each value
 * collect results in new array
 * @param time String 
 * @param fn Function (Optional parameter) the function to apply to each value
 * @return Array
 */
var splitTime = function(time, fn) {
  fn = typeof fn === "undefined" ? 
    function(a) {return a;} : 
    fn;
  return time.split("").map(function(val) {
    return fn(val); 
  });
};

module.exports = {
  preProcess: preProcess,
  splitTime: splitTime
};
