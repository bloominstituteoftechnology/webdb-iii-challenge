const express = require('express');
const knex = require('knex');
const helmet = require('helmet');
const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

// End points

// Port
server.listen(9000, () => {
    console.log("App listening on port 9000")
})