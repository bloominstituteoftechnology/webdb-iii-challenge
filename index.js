const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const server = express();
const knexConfig = require('./knexfile')
const db = knex(knexConfig.development)

server.use(express.json());
server.use(helmet());


const port = 4300;
server.listen(port, function() {
  console.log(`\n==^_^== Listening on http://localhost:${port} ==^_^==\n`);
});
