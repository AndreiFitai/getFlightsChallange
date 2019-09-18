const express = require("express");
const morgan = require("morgan");
const http = require("http");
const { logger, getEnv } = require("./helpers");

const app = express();
const router = express.Router();

const port = getEnv("PORT") || "3000";

app.use(router);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);

server.listen({ port }, () => {
  logger.info(`🚀 Server ready at http://localhost:${port}`);
});

router.get("/", (req, res) => {
  res.send("hello from my express app");
});
