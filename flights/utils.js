const { logger } = require("../helpers");

const processApiRespose = response => {
  const processedData = [];
  response.data.flights.map(trip => {
    for (let flight of trip.slices) {
      flight.id = `${flight.flight_number}_${flight.departure_date_time_utc}`;
      processedData.push(flight);
    }
  });
  return processedData;
};

//* optimized for performance
const processFlightsData = (...flightLists) => {
  const filteredFlights = [];

  for (let i = 0, n = flightLists.length; i < n; ++i) {
    if (flightLists[i].error) return flightLists[i].error;

    for (let j = 0, m = flightLists[i].length; j < m; ++j) {
      if (!filteredFlights.some(item => item.id === flightLists[i][j].id))
        filteredFlights.push(flightLists[i][j]);
    }
  }

  return { flights: [...filteredFlights] };
};

//* better readability
// const processFlightsData = (...flightLists) => {
//   if (list.error) return list.error;

//   const filteredFlights = [];

//   flightLists.forEach(list => {
//     if (list.error) return list.error;

//     list.forEach(flight => {
//       if (!filteredFlights.some(item => item.id === flight.id))
//         filteredFlights.push(flight);
//     });
//   });

//   return { flights: [...filteredFlights] };
// };

const handleError = error => {
  if (error.response) {
    logger.info(error.response.status, error.response.data);

    return {
      error: { message: error.response.data, status: error.response.status }
    };
  } else if (error.request) {
    const message = "Something went wrong with the request";

    logger.error(message);

    return { error: { message } };
  } else return error;
};

module.exports = { processApiRespose, processFlightsData, handleError };
