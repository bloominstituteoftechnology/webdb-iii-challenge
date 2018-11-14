const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile')
const db = knex(knexConfig.development)

const cohorts = require('./cohortsRoute')
const server = express();

server.use(express.json());

server.use('/api/cohorts', cohorts)


// server.get('/', (req, res) => {
//   res.json({
//     api: 'web api is running'
//   })
// })

module.exports = server;