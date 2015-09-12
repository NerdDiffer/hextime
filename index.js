var correlationMethods = require('./lib/correlationMethods.js');

module.exports = {
  HexTime: require('./lib/HexTime.js'),
  RegTime: require('./lib/RegTime.js'),
  fromHexadecimal: correlationMethods.fromHexadecimal,
  fromRegular:     correlationMethods.fromRegular
};
