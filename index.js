const express = require("express");
const server = express();

const helmet = require("helmet");
const morgan = require("morgan");

const cohortRouter = require("./routers/cohortRouter");
const studentRouter = require("./routers/studentRouter");

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));

// endpoints here
server.use("/api/cohorts", cohortRouter);
// server.use("/api/students", studentRouter);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});