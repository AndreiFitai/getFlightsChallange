const axios = require('axios');
const { getEnv } = require('../helpers');
const { logger } = require('../helpers');

const axiosInstance = axios.create({
  baseURL: getEnv('BASE_URL', true),
  auth: {
    username: getEnv('AUTH_USER', true),
    password: getEnv('AUTH_PASSWORD', true),
  },
});

const processApiRespose = response => {
  const processedData = [];
  for (let i = 0; i < response.data.flights.length; i += 1) {
    const flight = response.data.flights[i];
    flight.id = `${flight.flight_number}_${flight.departure_date_time_utc}`;
    processedData.push(flight);
  }
  return processedData;
};

//* optimized for performance
const processFlightsData = (...flightLists) => {
  const filteredFlights = [];

  for (let i = 0, n = flightLists.length; i < n; i += 1) {
    if (flightLists[i].error) return flightLists[i].error;

    for (let j = 0, m = flightLists[i].length; j < m; j += 1) {
      if (!filteredFlights.some(item => item.id === flightLists[i][j].id))
        filteredFlights.push(flightLists[i][j]);
    }
  }

  return { flights: [...filteredFlights] };
};

//* better readability
// const processFlightsData = (...flightLists) => {
//   const filteredFlights = [];

//   flightLists.forEach(list => {
//     if (list.error) return list.error;
//     list.forEach(flight => {
//       if (!filteredFlights.some(item => item.id === flight.id))
//         filteredFlights.push(flight);
//     });
//     return false;
//   });

//   return { flights: [...filteredFlights] };
// };

const handleError = error => {
  if (error.response) {
    logger.info(error.response.status, error.response.data);

    return {
      error: { message: error.response.data, status: error.response.status },
    };
  }
  if (error.request) {
    const message = 'Something went wrong with the request';

    logger.error(message);

    return { error: { message } };
  }
  return error;
};

module.exports = {
  axiosInstance,
  processApiRespose,
  processFlightsData,
  handleError,
};
