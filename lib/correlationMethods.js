/**
 * Correlation methods
 * Mapping a hexadecimal unit of time to a matching decimal unit of time
 * and visa-versa.
 * - second to second
 * - minute to minute
 * - hour to hour
 */

var RegTime = require('./RegTime.js');
var HexTime = require('./HexTime.js');

module.exports.fromRegular = {
  toHexSec: function(decSec) {
    var hexBase = Math.pow(HexTime.base, 4);
    var decBase = RegTime.ssInDD();
    return (decSec * ( hexBase / decBase )).toFixed(3);
  },
  toHexMin: function(decMin) {
    var hexBase = Math.pow(HexTime.base, 3);
    var decBase = RegTime.mmInDD();
    return (decMin * ( hexBase / decBase )).toFixed(3);
  },
  toHexHour: function(decHour) {
    var hexBase = Math.pow(HexTime.base, 1);
    var decBase = RegTime.hhInDD;
    return (decHour * ( hexBase / decBase )).toFixed(3);
  }
};

module.exports.fromHexadecimal = {
  toRegSec: function(hexSec) {
    var decBase = RegTime.ssInDD();
    var hexBase = Math.pow(HexTime.base, 4);
    return hexSec * ( decBase / hexBase ).toFixed(3);
  },
  toRegMin: function(hexMin) {
    var decBase = RegTime.mmInDD();
    var hexBase = Math.pow(HexTime.base, 3);
    return hexMin * ( decBase / hexBase ).toFixed(3);
  },
  toRegHour: function(hexHour) {
    var decBase = RegTime.hhInDD;
    var hexBase = Math.pow(HexTime.base, 1);
    return hexHour * ( decBase / hexBase ).toFixed(3);
  }
};
