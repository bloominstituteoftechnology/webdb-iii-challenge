const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");

// routes
const cohortsRoute = require("./cohorts");
//init
const server = express();
//middleware
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(logger("dev"));

//use routes
server.use("/api/cohorts", cohortsRoute);

port = 5000;
server.listen(port, () =>
  console.log(`
  ---------------------------------------------------------
             **   Server Running on port ${port}  **
  ---------------------------------------------------------
  `)
);
