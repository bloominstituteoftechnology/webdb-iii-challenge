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
            if (cohort[0] === '' || cohort[0] === undefined) {
                res.status(400).json({message: 'Cohort ID Not found'})
            } else {
                //console.log(cohort)
                res.status(200).json(cohort)
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

// update cohort
server.put('/api/cohorts/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;

    if (changes.name === '' || changes.name === undefined) {
        return res.status(400).json({message: 'Cohorts name is require'})
    }

    db('cohorts')
        .where({id})
        .update(changes)
        .then(count => {
            res.status(200).json({message: `${count} cohort is updated`})
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
});

// delete cohort
server.delete('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;

    db('cohorts')
        .where({id})
        .del()
        .then(count => {
            if(count === '' || count === undefined) {
                return res.status(400).json({message: 'Cohorts id do not exists'})
            } else {
                res.status(200).json({message: `${count} cohort is delete`})
            }
        })
        .catch(err => {
            res.status(500).json({message: err })
        })
});

server.listen(9000, () => console.log('\n== Port 9k ==\n'));