const express = require('express');
const knex = require('knex');

const dbConfig = require('./knexfile');

const server = express();
const port = 3300;
const db = knex(dbConfig.development);

server.use(express.json());

server.listen(port, () => console.log(`Listening on port: ${port}`));
