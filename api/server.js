const express = require('express');
const helmet = require('helmet');

const cohortRouter = require('../cohort/cohort-router.js');
const studentRouter = require('../student/student-router.js');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/cohort', cohortRouter);
server.use('/api/student', studentRouter);

module.exports = server;