const express = require("express");
const morgan = require("morgan");
const http = require("http");
const { logger, getEnv } = require("./helpers");
const { getFlights } = require("./flights");
const app = express();
const router = express.Router();

const port = getEnv("PORT") || "3000";

app.use(router);
app.use(morgan("dev"));

const server = http.createServer(app);

server.listen({ port }, () => {
  logger.info(`🚀 Server ready at http://localhost:${port}`);
});

router.get("/", async (req, res) => {
  console.time("query time: ");

  const flights = await getFlights();
  res.send(JSON.stringify(flights));
  
  console.timeEnd("query time: ");
});
