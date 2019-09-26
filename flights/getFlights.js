const { getCacheOnTimeout } = require('../cache');
const { getNewFlightsData } = require('./flightsDataUtils');

module.exports = async () => {
  return Promise.race([getNewFlightsData(), getCacheOnTimeout(900)]).then(
    value => {
      return value;
    },
  );
};
