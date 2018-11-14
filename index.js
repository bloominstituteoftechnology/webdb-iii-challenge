const express = require('express')
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
const server = express();
const port = 9000;
server.use(express.json());


server.get('/', (req, res) => {
    res.json({ api: 'running properly' });
});

server.listen(port, () => {console.log(`Server Running on Port ${port}`)})