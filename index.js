const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('HELLO');
})

server.get('/api/cohorts', (req, res) => {
    db('cohorts')
        .then(cohorts => res.status(200).json(cohorts))
        .catch(error => res.status(500).json(error));
})

server.get('/api/cohorts/:id', (req, res) => {
    db('cohorts')
        .where({ id: req.params.id })
        .then(cohort => res.status(200).json(cohort))
        .catch(error => res.status(500).json(error));
})

server.get('/api/cohorts/:id/students', (req, res) => {
    db('students')
        .where({ cohort_id: req.params.id })
        .then(student => res.status(200).json(student))
        .catch(error => res.status(500).json(error));
})

server.post('/api/cohorts', (req, response) => {
    db.insert(req.body)
        .into('cohorts')
        .then(cohorts => res.status(200).json(cohorts))
        .catch(error => res.status(500).json(error));
})

server.put('/api/cohorts/:id', (req, res) => {
    db('cohorts')
        .where({ id: req.params.id })
        .update(req.body)
        .then(cohort => res.status(200).json(cohort))
        .catch(error => res.status(500).json(error));
})

server.delete('/api/cohorts/:id', (req, res) => {
    db('cohorts')
        .where({ id: req.params.id })
        .del()
        .then(cohort => res.status(200).json(cohort))
        .catch(error => res.status(500).json(error));
})

server.listen(9000, () => console.log('\n== Port 9000 ==\n'));
