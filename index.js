const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
const server = express();
server.use(express.json());


server.post('.api/cohorts', (req, res) => {
    const cohort = req.body;
    db('cohorts')
        .insert(cohort)
        .returning('id')
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({ message: 'server error', err});
        })
});

server.get('./api/cohorts', (req, res) => {
    db('cohorts')
        .get()
        .then(cohorts => {
            res.status(200).json(cohorts);
        })
        .catch(err => {
            res.status(500).json({ message: 'server error', err});
        })
});

server.get('./api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    db('cohorts')
        .get(id)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({ message: 'server error', err});
        })
});

server.get('./api/cohorts/:id/students', (req, res) => {

});

server.put('./cohorts/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    db('cohorts')
        .update(changes)
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err => {
            res.status(500).json({ message: 'server error', err});
        })
});

server.delete('./cohorts/:id', (req, res) => {
    const { id } = req.params;
    db('cohorts')
        .del(id)
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err => {
            res.status(500).json({ message: 'server error', err});
        })
})



server.post('.api/students', (req, res) => {
    const student = req.body;
    db('students')
        .insert(student)
        .returning('id')
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({ message: 'server error', err})
        })
});