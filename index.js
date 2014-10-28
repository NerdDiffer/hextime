var TimeObj = require('./dev/TimeObj')
  , tools = require('./dev/tools');

module.exports = {
  HexTime: TimeObj.HexTime,
  DecTime: TimeObj.DecTime,
  preProcess: tools.preProcess,
  splitTime: tools.splitTime
};
