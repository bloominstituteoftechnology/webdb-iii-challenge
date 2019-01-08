const express = require('express');
const knex = require('knex');

const dbConfig = require('./knexfile');

const server = express();
const db = knex(dbConfig.development);
const PORT = 8000;


server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})

