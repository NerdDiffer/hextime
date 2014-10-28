/**
 * extract the time out of a Date object
 * pass in: 'Mon Oct 27 2014 15:06:36 GMT-0700 (PDT)'
 * output: hours, minutes, seconds
 * @param dateObj, Date: regular javascript date object
 * @param del, optional param: delimiter to separate hh:mm:ss. default is ':'
 * @return, the string
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
 * parse time
 * pass this function Date#toTimeString()
 * to strip the string of ':' & time zone info
 * pass in: Sat Oct 18 2014 12:20:37 GMT -0700 (PDT)
 * becomes: 122037
 * @param timeStr String 
 * @return String of digits only
 */
var parseTime = function(timeStr) {
  return timeStr.slice(0,8).replace(/\:/g, '');
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
