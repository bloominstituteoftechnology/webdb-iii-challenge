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

server.get('/api/cohorts', (req, res) => {
    db('cohorts')
    .then(cohorts => res.status(200).json(cohorts))
    .catch(error => res.status(500).json({ message: "failed to get cohorts"}))
})

server.get('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    db('cohorts')
    .where({ id: id })
    .then(cohorts => res.status(200).json(cohorts))
    .catch(error => res.status(500).json({ message: "No cohort by that ID found"}))
})

server.get('/api/cohorts/:id/students', (req, res) => {
    const { id } = req.params;
    db('cohorts as c')
    .join('students as s','c.id', 's.cohort_id')
    .select('s.name', 'c.name as cohort')
    .where('s.cohort_id', id)
    .then(students => res.status(200).json(students))
    .catch(error => res.status(500).json({ message: `failed to get students in cohort ${id}` }))
})

server.post('/api/cohorts', (req, res) => {
    const name = req.body;
    db('cohorts')
    .insert(name)
    .then(ids => {
        res.status(201).json(ids);
    })
    .catch(error => res.status(500).json({ message: "failed to post new cohort" }))
})

server.put('/api/cohorts/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    db('cohorts')
    .where({ id: id })
    .update(changes)
    .then(count => {
        res.status(200).json({ count });
    })
    .catch(error => res.status(500).json({ message: "Failed to update data"}))
})

server.delete('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    db('cohorts')
    .where({ id: id})
    .del()
    .then(count => res.status(200).json(count))
    .catch(err => {
        res.status(400).json({ message: "failed to delete cohort"})
    })
})




const port = 4000;
server.listen(port, function() {
    console.log(`\n===Web API Listening on http://localhost:${port}===\n`)
})