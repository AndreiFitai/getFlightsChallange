const { logger } = require('../helpers');

module.export = error => {
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
