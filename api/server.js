const express = require("express");
const server = express();
const configureMiddleware = require("../config/middlewareConfig");
const cohortsRoutes = require("../cohorts/cohortsRoutes");
const studentsRoutes = require("../students/studentsRoutes");

configureMiddleware(server);

server.get("/", (req, res) => {
  res.send("Sanity check: It's up!");
});

server.use("/cohorts", cohortsRoutes);
server.use("/students", studentsRoutes);

module.exports = server;
