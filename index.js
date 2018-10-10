const express = require("express");
const helmet = require("helmet");

const cohortsRoutes = require("./cohorts/cohortsRoutes.js");
const studentsRoutes = require("./students/studentsRoutes.js");

const server = express();

server.use(express.json());
server.use(helmet());

server.use("/api/cohorts", cohortsRoutes);
server.use("/api/students", studentsRoutes);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
