const express = require('express');
const knex = require('knex');
const helmet = require('helmet');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// check if test server are running
server.get('/', (req, res) => {
    res.status(200).json({message: 'server is running'})
});

// get all the cohort data
server.get('/api/cohorts', (req, res) => {
    db('cohorts')
        .then(cohorts => {
            res.status(200).json({cohorts})
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
});

server.listen(9000, () => console.log('\n== Port 9k ==\n'));