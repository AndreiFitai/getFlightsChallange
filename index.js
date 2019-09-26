const express = require('express');
const http = require('http');
const { logger, getEnv } = require('./helpers');
const { getFlights } = require('./flights');
const { initialCache, getCachedData, cacheData } = require('./cache');

const app = express();
const router = express.Router();

const port = getEnv('PORT') || '3000';

app.use(router);

const server = http.createServer(app);

server.listen({ port }, () => {
  logger.info(`🚀 Server ready at http://localhost:${port}`);
  initialCache();
});

router.get('/', async (req, res) => {
  console.time('query time: ');

  const flights = await getFlights();
  if (flights.error) {
    res.send(JSON.stringify(getCachedData(flights)));
  } else {
    cacheData(flights);

    res.send(JSON.stringify(flights));
  }

  console.timeEnd('query time: ');
});
