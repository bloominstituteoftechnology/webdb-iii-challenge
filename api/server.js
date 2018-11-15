const express = require("express");
const middleware = require("./middleware/config");
const studentRouter = require("./routes/studentRoutes.js");
const cohortRouter = require("./routes/cohortRoutes.js");
const server = express();

//middleware
middleware(server);

//routes
server.use("/api/students", studentRouter);
server.use("/api/cohorts", cohortRouter);

module.exports = server;
