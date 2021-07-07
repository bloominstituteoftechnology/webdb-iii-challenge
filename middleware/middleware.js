const express = require("express");
const helmet = require("helmet");

const cohortRoutes = require("../routes/cohortRoutes.js");
const studentRoutes = require("../routes/studentRoutes.js");

module.exports = server => {
  server.use(helmet());
  server.use(express.json());

  server.use("/api/cohorts", cohortRoutes);
  server.use("/api/students", studentRoutes);
};
