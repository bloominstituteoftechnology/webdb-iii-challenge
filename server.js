const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");

// routes

//init
const server = express();
//middleware
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(logger("dev"));

//use routes

port = 5000;
server.use(port, () =>
  console.log(`
  -----------------------------------------------------------------------------------------------
                             **   Server Running on port ${port}  **
  -----------------------------------------------------------------------------------------------
  `)
);
