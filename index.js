const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());


server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    if (!cohort.name) {
        res.status(400).json({ error: "Please provide a name for the cohort." })
    } else
        db.insert(cohort)
        .into('cohorts')
        .then(ids => {
        res.status(201).json(ids);
        })
        .catch(err => res.status(500).json({ error: "There was an error saving the cohort." }))
})
    
server.get('/api/cohorts', (req, res) => {
    db('cohorts')
    .then(cohorts => {
        res.status(200).json(cohorts)
    })
    .catch(err => res.status(500).json(err));
})

server.get('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;
    db('cohorts').where({ id: id })
    .then(cohort => {
        if (cohort.length === 0) {
        res.status(404).json({ message: "The cohort with the specified ID does not exist." });
        } else 
        res.status(200).json(cohort);
    })
    .catch(err => res.status(500).json(err));
})

server.delete('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;
    db('cohorts').where({ id: id }).del()
    .then(count => {
        if (count) {
        res.status(204).end();
        } else {
        res.status(404).json({ message: "The cohort with the specified ID does not exist." });
        }
    })
    .catch(err => res.status(500).json(err));
})

server.put('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;
    const cohort = req.body;
    if (!cohort.name) {
        res.status(400).json({ error: "Please provide a name for the cohort." })
    } else
        db('cohorts').where({ id: id }).update(cohort)
        .then(count => {
        if (count) {
            res.status(200).json({ message: "The cohort was successfully updated." });
        } else {
            res.status(404).json({ message: "The cohort with the specified ID does not exist." });
        }
        })
        .catch(err => res.status(500).json(err));
})

const port = 8000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
