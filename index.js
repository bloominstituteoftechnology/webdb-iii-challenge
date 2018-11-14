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

// get cohort by id
server.get('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;

    db('cohorts')
        .where({id})
        .then(cohort => {
            if (cohort) {
                res.status(200).json(cohort)
            } else {
                res.status(404).json({message: 'Cohort ID Not found'})
            }
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
});

// add new cohort to database
server.post('/api/cohorts', (req, res) => {
    const changes = req.body;

    if (changes.name === '' || changes.name === undefined) {
        return res.status(400).json({message: 'Cohorts name is require'})
    }

    db('cohorts')
        .insert(changes)
        .then(id => {
            res.status(200).json(changes)
        })
        .catch(err => {
            res.status(500).json({message: err })
        })
});

server.listen(9000, () => console.log('\n== Port 9k ==\n'));