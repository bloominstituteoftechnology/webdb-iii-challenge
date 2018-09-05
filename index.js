const express = require('express');
const server = express();

server.use(express.json());

const cohortsRoute = require('./routes/cohortsRoute');
const studentsRoute = require('./routes/studentsRoute');

server.use("/api/cohorts", cohortsRoute);
server.use("/api/students", studentsRoute);

server.listen(8000, () => console.log('===Listening on port 8000==='))