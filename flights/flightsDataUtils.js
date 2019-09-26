const axios = require('axios');
const { getEnv } = require('../helpers');
const handleError = require('../errors');

const axiosInstance = axios.create({
  baseURL: getEnv('BASE_URL', true),
  auth: {
    username: getEnv('AUTH_USER', true),
    password: getEnv('AUTH_PASSWORD', true),
  },
});

const createId = flight => {
  const departureSlice1 = Date.parse(flight.slices[0].departure_date_time_utc);
  const departureSlice2 = Date.parse(flight.slices[1].departure_date_time_utc);
  return (
    flight.slices[0].flight_number +
    flight.slices[1].flight_number +
    departureSlice1 +
    departureSlice2
  );
};

const processApiResponse = response => {
  const processedData = [];
  response.data.flights.forEach(flight => {
    const id = createId(flight);
    const flightWithId = {};
    flightWithId[id] = flight;
    processedData.push(flightWithId);
  });
  return processedData;
};

const getData = async path => {
  try {
    const response = await axiosInstance.get(path);
    return processApiResponse(response);
  } catch (error) {
    return handleError(error, path);
  }
};

const processFlightsData = (...flightLists) => {
  const filteredFlights = {};

  for (let i = 0; i < flightLists.length; i++) {
    const list = flightLists[i];

    if (list.error) return list;

    list.forEach(flight => {
      Object.assign(filteredFlights, flight);
    });
  }

  return { dataStatus: 'Live', flights: filteredFlights };
};

const getNewFlightsData = async () => {
  const flightDataOne = await getData('/source1');
  const flightDataTwo = await getData('/source2');
  const result = processFlightsData(flightDataOne, flightDataTwo);

  return result;
};

module.exports = {
  getNewFlightsData,
  getData,
  processApiResponse,
  processFlightsData,
};
