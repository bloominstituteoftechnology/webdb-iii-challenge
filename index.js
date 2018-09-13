const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const server = express();
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);
server.use(express.json());
server.use(helmet());
server.get('/api/cohorts', (req, res) => {
    db('cohorts')
        .then(cohorts => {
            res.status(200).json(cohorts);
        })
        .catch(err => res.status(500).json({ errorMessage: 'Information for cohorts not received' }));
})

server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    db.insert(cohort)
        .into('cohorts')
        .then(id => {
            res.status(201).json(id);
        })
        .catch(err => res.status(500).json({ errorMessage: 'Error saving to database' }));
});

