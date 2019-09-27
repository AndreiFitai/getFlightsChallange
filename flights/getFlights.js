const { getEnv } = require('../helpers');
const cache = require('../cache');
const flights = require('./flightsDataUtils');

const responseTime = getEnv('RESPONSE_TIME') || 1000;

module.exports = async () => {
  return Promise.race([
    flights.getNewFlightsData(),
    cache.getDataOnTimeout(responseTime),
  ]).then(value => {
    return value;
  });
};
