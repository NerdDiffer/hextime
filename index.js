var TimeObj = require('./lib/TimeObj')
  , helpers = require('./lib/helpers');

module.exports = {
  HexTime:    TimeObj.HexTime,
  DecTime:    TimeObj.DecTime,
  preProcess: helpers.preProcess,
  splitTime:  helpers.splitTime
};
