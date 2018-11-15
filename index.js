const express = require("express");
const server = express();
const port = 7000;

const cohortsRouter = require("./routers/cohortsRouter");
// const studentsRouter = require('./routers/students');

server.use(express.json());
server.use("/api/cohorts", cohortsRouter);
// server.use('/api/students', studentsRouter);

// [POST] '/api/cohorts'
// This route should save a new cohort to the database.

server.listen(port, () => console.log("\n== PORT IS LIVE ON 7000 ==\n"));
