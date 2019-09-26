const getFlights = require('./getFlights');
const { cacheData, getCachedData } = require('../cache');

module.exports = async () => {
  const flights = await getFlights();
  if (flights.error) {
    return JSON.stringify(getCachedData(flights));
  }

  cacheData(flights);

  return JSON.stringify(flights);
};
