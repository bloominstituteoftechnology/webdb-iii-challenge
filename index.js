const express = require('express');
const knex = require('knex');
const helmet = require('helmet');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.status(200).json({message: 'server is running'})
});

server.listen(9000, () => console.log('\n== Port 9k ==\n'));