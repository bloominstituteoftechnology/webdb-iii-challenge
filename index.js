const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
const server = express();

server.use(express.json());

const port = 8000;
server.listen(port, function() {
  console.log(`\n=== Web API listening on http://localhost:${port} ===\n`);
});
