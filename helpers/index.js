const pino = require("pino");
const dotenv = require("dotenv");

dotenv.config();

const defaultOptions = {
  prettyPrint: {
    colorize: true,
    translateTime: false,
    ignore: "time,pid,hostname"
  },
  base: null,
  timestamp: false
};

const logger = pino(Object.assign({ level: "debug" }, defaultOptions));

const { env } = process;

const getEnv = (variable, required) => {
  if (!env[variable] && required) {
    if (env.NODE_ENV !== "test") {
      throw new Error(`Environment variable ${variable} is required`);
    }
  }
  if (!env[variable]) {
    if (env.NODE_ENV !== "test") {
      logger.warn(`Environment variable ${variable} is missing`);
    }
  }

  return env[variable];
};

module.exports = { logger, getEnv };
