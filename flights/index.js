const getFlights = require('./getFlights');
const cache = require('../cache');

module.exports = async () => {
  const flights = await getFlights();
  if (flights.error) {
    return JSON.stringify(cache.getData(flights));
  }

  cache.setData(flights);

  return JSON.stringify(flights);
};
