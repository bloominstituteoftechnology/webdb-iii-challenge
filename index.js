const express = require('express');
const knex = require('knex');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();
const port = 8000;

server.use(express.json());

server.listen(port, () => console.log(`\nWeb API running on http://localhost:${port}\n`));
