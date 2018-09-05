const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');

const server = express();
const db = knex(knexConfig.development);

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello FSW12');
} );

server.listen(8000, () => console.log('Running on port 8000'));