const express = require('express');
const knex = require('knex');
// const helmet = require('helmet');

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

// const nameCheck = require('../middleware/nameCheck.js')


const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;