const { logger } = require('../helpers');

module.exports = (error, path) => {
  if (error.response) {
    logger.info(path, error.response.status, error.response.data);

    return {
      error: {
        path,
        message: error.response.data,
        status: error.response.status,
      },
    };
  }
  if (error.request) {
    const message = 'Something went wrong with the request';

    logger.error(message);

    return { error: { message } };
  }
  return error;
};
