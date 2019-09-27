const pino = require('pino');
const dotenv = require('dotenv');

dotenv.config();

const defaultOptions = {
  enabled: !(process.env.NODE_ENV === 'test'),
  prettyPrint: {
    colorize: true,
    translateTime: false,
    ignore: 'time,pid,hostname',
  },
  base: null,
  timestamp: false,
};

const logger = pino({ level: 'debug', ...defaultOptions });

const { env } = process;

const getEnv = (variable, required) => {
  if (!env[variable] && required) {
    if (env.NODE_ENV !== 'test') {
      logger.error(`Environment variable ${variable} is required`);
      throw new Error(`Required enviroment variable missing`);
    }
  }
  if (!env[variable]) {
    if (env.NODE_ENV !== 'test') {
      logger.warn(`Environment variable ${variable} is missing`);
    }
  }

  return env[variable];
};

module.exports = { logger, getEnv };
