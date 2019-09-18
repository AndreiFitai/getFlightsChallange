const winston = require("winston");
const dotenv = require("dotenv");

dotenv.config();

const logger = new winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

const { env } = process;

const getEnv = variable => {
  if (!env[variable]) {
    if (env.NODE_ENV !== "test") {
      logger.warn(`Environment variable ${variable} is missing`);
    }
  }

  return env[variable];
};

module.exports = { logger, getEnv };
