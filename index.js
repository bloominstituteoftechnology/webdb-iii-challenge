const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

//endpoints:

//get

server.get('/api/cohorts', (req, res) => {
    db('cohorts')
        .then(cohorts => { res.status(200).json(cohorts) })
        .catch(err => { res.status(500).json(err) })
});

server.get('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    db('cohorts')
        .where({ id })
        .then(cohort => {
            if (!cohort[0]) {
                res.status(404).json({ Message: `Id not found` })
            } else {
                res.status(200).json(cohort)
            }
        })
        .catch(err => {
            res.status(500).json({ Message: 'Id not found', err })
        })
});

// add new cohort (post)

server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    db('cohorts')
        .insert(cohort)
        .returning('id')
        .then(ids => {
            res.status(201).json(ids)
        })
        .catch(err => {
            res.status(500).json({ Message: 'Error adding Cohort', err })
        })
});

//updating cohort (put)

server.put('/api/cohorts/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    db('cohorts')
        .where({ id })
        .update(changes)
        .then(count => {
            res.status(200).json(count)
        })
        .catch(err => {
            res.status(500).json({ Message: 'Error updating', err })
        })
});

// deleting cohort

server.delete('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    db('cohorts')
        .where({ id })
        .del()
        .then(count => {
            res.status(200).json(count)
        })
        .catch(err => {
            res.status(500).json({ Message: 'Error deleting cohort', err })
        })
});

server.get('/', (req, res) => {
    res.json({ api: 'up' });
});

server.listen(9000, () => console.log('\n==Port 9K==\n'));