//dependency imports
const express = require("express");

//in-app imports
const cohortRouter = require("./cohorts/cohortRouter.js");
const studentRouter = require("./students/studentRouter.js");

//initialize db and server
const server = express();

//middleware
server.use(express.json());

// endpoints
server.use("/api/cohorts", cohortRouter);
server.use("/api/students", studentRouter);

server.listen(8000, () => console.log("\nNow listening on port 8000\n"));
