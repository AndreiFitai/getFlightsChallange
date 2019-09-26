// const cache = require('./cache');
const { getNewData } = require('../flights/flights');

const cache = {};

const cacheData = data => {
  if (!Object.keys(data).includes('flights')) {
    return false;
  }
  Object.assign(cache, data, { dataStatus: 'Cached' });
  return true;
};

const initialCache = async () => {
  const result = await getNewData();
  if (!Object.keys(result).includes('flights')) {
    await initialCache();
  } else {
    Object.assign(cache, { dataStatus: 'Cached' }, result);
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
      getCachedData({ error: { message: 'Api took too long to respond' } }),
    ),
  );
};

module.exports = { cacheData, getCachedData, initialCache, getCacheOnTimeout };
