var assert = require('assert')
  , TimeObj = require('../dev/TimeObj')
  , tools = require('../dev/tools')
  , base = require('all-your-base');

var decToHex = base.decToHex
  , hexToDec = base.hexToDec
  , preProcess = tools.preProcess
  , splitTime = tools.splitTime;

var hexTime = TimeObj.HexTime
  , decTime = TimeObj.DecTime;

describe('preProcess', function() {
  var date1 = new Date(2014,10,27,15,06,36);
  var dateStr = new Date('Mon Oct 27 2014 15:06:36 GMT-0700 (PDT)');
  it('should take in a Date object, convert it to a timeString using the prototype method, #toTimeString, and return the first 8 characters', function() {
    var now = new Date();
    assert.equal(now.toTimeString().slice(0,8), preProcess(now));
  });
  it('should take a new Date object & extract the time portion as a string', function() {
    assert.equal('15:06:36', preProcess(date1));
    assert.equal('15:06:36', preProcess(dateStr));
  });
  it('should accept optional parameter, del, to delimit hours, minutes, seconds', function() {
    assert.equal('15_06_36', preProcess(date1, '_'));
  });
  it('should also let you pass in empty string as optional 2nd parameter', function() {
    assert.equal('150636', preProcess(date1, ''));
  });
});
// parseTime() marked for deprecation
//describe('parseTime', function() {
//  it('should take a string & output something', function() {
//    var str0 = new Date(2014, 10, 27,15,6,36).toTimeString();
//    //var str1 = 'Mon Oct 27 2014 15:06:36 GMT-0700 (PDT)'.toTimeString();
//    var str2 = 'Mon Oct 27 2014 00:00:00 GMT-0700 (PDT)';
//    assert.equal('150636', parseTime(str0));
//  });
//});
