const { getEnv } = require('../helpers');
const { getCacheOnTimeout } = require('../cache');
const { getNewFlightsData } = require('./flightsDataUtils');

const responseTime = getEnv('RESPONSE_TIME') || 1000;

module.exports = async () => {
  return Promise.race([
    getNewFlightsData(),
    getCacheOnTimeout(responseTime),
  ]).then(value => {
    return value;
  });
};
