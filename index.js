const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// listening port
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== API listening on http://localhost:${port} ===\n`);
});