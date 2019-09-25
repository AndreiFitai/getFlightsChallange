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

const processApiResponse = response => {
  const processedData = [];
  response.data.flights.forEach(roundTrip => {
    roundTrip.forEach(flight => {
      Object.assign(flight, {
        id: `${flight.flight_number}_${flight.departure_date_time_utc}`,
      });
      processedData.push(flight);
    });
  });
  return processedData;
};

const getData = async path => {
  try {
    const response = await axiosInstance.get(path);
    return processApiResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const processFlightsData = (...flightLists) => {
  const filteredFlights = [];

  flightLists.forEach(list => {
    if (list.error) return list.error;
    list.forEach(flight => {
      if (!filteredFlights.some(item => item.id === flight.id))
        filteredFlights.push(flight);
    });
    return false;
  });

  return { flights: [...filteredFlights] };
};

module.exports = {
  getData,
  processFlightsData,
};
