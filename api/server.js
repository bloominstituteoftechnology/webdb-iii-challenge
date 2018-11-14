const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile')
const db = knex(knexConfig.development)

/* ---- Route Imports ---- */
const cohorts = require('./cohortsRoute')
const students = require('./studentsRoute')


const server = express();
server.use(express.json());

/* ---- ROOT ROUTE ---- */
server.get('/', (req, res) => {
  res.json({
    api: 'web api is running'
  })
})

/* ---- Cohorts Route ---- */
server.use('/api/cohorts', cohorts)

/* ---- Students Route ---- */
server.use('/api/students', students)




module.exports = server;