const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.get('/', (req, res) => {
    res.status(200).json({ message: 'At /'});
});


const port = 7000;
server.listen(port, () => console.log(`\nServer up on port ${port}\n`));