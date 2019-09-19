const axios = require("axios");
const { getEnv } = require("../helpers");

const instance = axios.create({
  baseURL: getEnv("BASE_URL"),
  auth: {
    username: getEnv("AUTH_USER"),
    password: getEnv("AUTH_PASSWORD")
  }
});

const getFlights1 = () => {
  return instance.get("/source1");
};

const getFlights2 = () => {
  return instance.get("/source2");
};

const getFlights = async () => {
  const [flights1, flights2] = await Promise.all([
    getFlights1(),
    getFlights2()
  ]);
  const flightDataOne = flights1.data.flights;
  const flightDataTwo = flights2.data.flights;
  const result = flightDataOne.concat(
    flightDataTwo.filter(item => {
      return flightDataOne.indexOf(item) < 0;
    })
  );

  return { flights: [...result] };
};

module.exports = { getFlights };
