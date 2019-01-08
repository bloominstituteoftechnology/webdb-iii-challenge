const express = require('express');
const knex = require('knex');
const dbConfig = require('./knexfile.js');

const server = express();
const db = knex(dbConfig.development);

server.use(express.json());

const PORT = 4400;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});