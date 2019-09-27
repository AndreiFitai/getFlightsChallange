const { getNewFlightsData } = require('../flights/flightsDataUtils');
const { logger } = require('../helpers');

const cache = {};
const cachedStatus = { dataStatus: 'Cached' };

const setData = data => {
  if (!Object.keys(data).includes('flights')) {
    return false;
  }
  Object.assign(cache, data, cachedStatus);
  return true;
};

const setInitial = async () => {
  const data = await getNewFlightsData();
  if (!Object.keys(data).includes('flights')) {
    await setInitial();
  } else {
    Object.assign(cache, data, cachedStatus);
    logger.info(`Initial flights data cached!`);
  }
};

const getData = reason => {
  return { ...reason, ...cache };
};

const getDataOnTimeout = delay => {
  return new Promise(resolve =>
    setTimeout(
      resolve,
      delay,
      getData({ error: { message: 'Service took too long to respond' } }),
    ),
  );
};

module.exports = {
  setData,
  getData,
  setInitial,
  getDataOnTimeout,
};
