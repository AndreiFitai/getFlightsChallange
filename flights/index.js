const axios = require("axios");
const { getEnv } = require("../helpers");
const {
  processApiRespose,
  handleError,
  processFlightsData
} = require("./utils");

const instance = axios.create({
  baseURL: getEnv("BASE_URL", true),
  auth: {
    username: getEnv("AUTH_USER", true),
    password: getEnv("AUTH_PASSWORD", true)
  }
});

const getFlights1 = async () => {
  try {
    const response = await instance.get("/source1");
    return processApiRespose(response);
  } catch (error) {
    return handleError(error);
  }
};

const getFlights2 = async () => {
  try {
    const response = await instance.get("/source2");
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
