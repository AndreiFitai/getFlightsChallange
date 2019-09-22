const { getData, processFlightsData } = require('./flights');

const getFlights = async () => {
  const flightDataOne = await getData('/source1');
  const flightDataTwo = await getData('/source2');

  const result = processFlightsData(flightDataOne, flightDataTwo);

  return result;
};

module.exports = { getFlights };
