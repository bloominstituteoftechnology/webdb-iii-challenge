const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");

// routes
const cohortsRoute = require("./cohorts");
const studentsRoute = require("./students");
//init
const server = express();
//middleware
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(logger("dev"));

//use routes
server.use("/api/cohorts", cohortsRoute);
server.use("/api/students", studentsRoute);
const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`
  ---------------------------------------------------------
             **   Server Running on port ${port}  **
  ---------------------------------------------------------
  `)
);
