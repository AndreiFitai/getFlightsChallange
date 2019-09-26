const { getNewFlightsData } = require('../flights/flightsDataUtils');
const { logger } = require('../helpers');

const cache = {};
const cachedStatus = { dataStatus: 'Cached' };

const cacheData = data => {
  if (!Object.keys(data).includes('flights')) {
    return false;
  }
  Object.assign(cache, data, cachedStatus);
  return true;
};

const initialCache = async () => {
  const data = await getNewFlightsData();
  if (!Object.keys(data).includes('flights')) {
    await initialCache();
  } else {
    Object.assign(cache, data, cachedStatus);
    logger.info(`Initial flights data cached!`);
  }
};

const getCachedData = reason => {
  return { ...reason, ...cache };
};

const getCacheOnTimeout = delay => {
  return new Promise(resolve =>
    setTimeout(
      resolve,
      delay,
      getCachedData({ error: { message: 'Service took too long to respond' } }),
    ),
  );
};

module.exports = { cacheData, getCachedData, initialCache, getCacheOnTimeout };
