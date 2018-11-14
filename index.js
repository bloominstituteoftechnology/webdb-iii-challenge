const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.json({ api: 'api is alive!'});
});


const port = 4000;
server.listen(port, function() {
    console.log(`\n===Web API Listening on http://localhost:${port}===\n`)
})