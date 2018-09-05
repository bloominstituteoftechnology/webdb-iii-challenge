const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');

const server = express();
const db = knex(knexConfig.development);

server.use(he  lmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello FSW12');
} );

server.get('/api/cohorts', (req, res) => {
    db('cohorts')
        .select('name')
        .then(cohorts => {
            res.status(200).json(cohorts);
        })
        .catch(err => res.status(500).json(err));
} );

server.listen(8000, () => console.log('Running on port 8000'));