const { getCacheOnTimeout } = require('../cache');
const { getNewData } = require('./flights');

const getFlights = async () => {
  return Promise.race([getNewData(), getCacheOnTimeout(900)]).then(value => {
    return value;
  });
};

module.exports = { getFlights };
