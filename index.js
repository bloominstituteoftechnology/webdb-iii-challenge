const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());


server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    db.insert(cohort).into('cohorts')
        .then(id => {
            res.status(201).json(id);
        })
        .catch(err =>
            res.status(500).json({ error: "The cohort could not be posted." }));
});

server.get('/api/cohorts', (req, res) => {
    db('cohorts')
        .then(cohorts => {
            res.status(201).json(cohorts);
        })
        .catch(err =>
            res.status(500).json({ error: "The cohorts could not be retrieved." }));
})

server.get('/api/cohorts/:id', (req, res) => {
    const id = req.params.id;
    db('cohorts')
        .where('id', id)
        .then(cohorts => {
            res.status(201).json(cohorts);
        })
        .catch(err =>
            res.status(500).json({ error: "Cohort by that ID could not be retrieved." }));
})

server.get('/api/students/:id', (req, res) => {
    const id = req.params.id;
    db('students')
        .where('id', id)
        .then(students => {
            res.status(201).json(students);
        })
        .catch(err =>
            res.status(500).json({ error: "Students by that cohort ID could not be retrieved." }));
})

server.put('/api/cohorts/:id', (req, res) => {
    const [id, body] = [req.params.id, req.body];
    db('cohorts')
        .where('id', id)
        .update('name', body.name)
        .then(cohorts => {
            res.status(201).json(cohorts);
        })
        .catch(err =>
            res.status(500).json({ error: "Cohort by that ID could not be updated." }));
})

server.delete('/api/cohorts/:id', (req, res) => {
    const id = req.params.id;
    db('cohorts')
        .where('id', id)
        .del()
        .then(cohorts => {
            res.status(201).json(cohorts);
        })
        .catch(err =>
            res.status(500).json({ error: "Cohort by that ID could not be deleted." }));
})

const port = 6300;
server.listen(port, function () {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});