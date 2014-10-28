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

describe('HexTime', function() {
  hexTime.logEnumProps();
  hexTime.logAllProps();
  //it("should inherit these properties from the Time object", function() {
  //  var timeProps = propsFromTimeObj.split(',');
  //  //console.log('timeProps:\n', timeProps);
  //  var hexProps = Object.keys(hexTime);
  //  //console.log('hexProps:\n', hexProps);
  //  assert.equal(
  //    true, 
  //    timeProps.forEach(function(timeProp) {
  //      //console.log(hexTime.timeProp);
  //      //console.log(hexTime.hasOwnProperty(timeProp));
  //      //return hexTime.hasOwnProperty(timeProp);
  //    })
  //    //timeProps.every(function(timeProp) {
  //    //  console.log('***');
  //    //  console.log(timeProp);
  //    //  return hexProps.some(function(hexProp) {
  //    //    console.log(hexProp);
  //    //    return hexProp === timeProp;
  //    //  });
  //    //})

  //    //hexProps.every(function(hexProp) {
  //    //  console.log('***');
  //    //  console.log(hexProp);
  //    //  return timeProps.some(function(timeProp) {
  //    //    console.log(timeProp);
  //    //    return hexProp === timeProp;
  //    //  });
  //    //});
  //  );
  //});
});
