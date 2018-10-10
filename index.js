const express = require("express");
const helmet = require("helmet");

const cohortsRoutes = require("./cohorts/cohortsRoutes.js");

const server = express();

server.use(express.json());
server.use(helmet());

server.use("/api/cohorts", cohortsRoutes);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
