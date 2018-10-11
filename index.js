const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());


server.get('/', (req, res) => {
  res.send("API is running");
});

server.get('/api/cohorts', (req, res) => {
    db
        .select().table('cohorts') 
        // .select('name').from('cohorts')
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

const port = 9000;

server.listen(port, () => {
    console.log('\nAPI running on port 9000\n')
});