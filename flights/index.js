const {
  axiosInstance,
  processApiRespose,
  handleError,
  processFlightsData
} = require("./utils");

const getFlights1 = async () => {
  try {
    const response = await axiosInstance.get("/source1");
    return processApiRespose(response);
  } catch (error) {
    return handleError(error);
  }
};

const getFlights2 = async () => {
  try {
    const response = await axiosInstance.get("/source2");
    return processApiRespose(response);
  } catch (error) {
    return handleError(error);
  }
};

const getFlights = async () => {
  const flightDataOne = await getFlights1();
  const flightDataTwo = await getFlights2();

  const result = processFlightsData(flightDataOne, flightDataTwo);

  return result;
};

module.exports = { getFlights };

// if (flightDataOne.error || flightDataTwo.error) {
//   return flightDataOne.error || flightDataTwo.error;
// }
