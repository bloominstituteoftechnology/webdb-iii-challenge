const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

// Imports Routes
const cohortsRouter = require('./cohortsRoute');
//const studentsRouter = require('./studentsRoute');

const server = express();
server.use(express.json());

// Route Roots
server.use('/api/cohorts', cohortsRouter);
//server.use('/api/students', studentsRouter)

module.exports = server;