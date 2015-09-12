var Time = require('./Time.js');

/**
 * RegTime object, this is "everytime time" where there are
 * 60 seconds in a minute, 60 minutes in an hour, 24 hours in a day.
 * Inherits some methods from the Time object
 */
var RegTime = Object.create(Time, {
  base:   {value: 10, enumerable: true},
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

module.exports = RegTime;
