const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexconfig = require('./knexfile.js');

const db = knex(knexconfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    if (!cohort.name) {
        res.status(500).json({ error: 'Please provide a name field.' });
    } else {
        db('cohorts')
            .insert(cohort)
            .then(id => {
                res.status(201).json(id);
            })
            .catch(err => {
                res.status(500).json({ error: 'Error adding cohort.', err });
            });
    }
});

server.get('/api/cohorts', (req, res) => {
    db('cohorts')
        .then(cohorts => {
            res.status(200).json(cohorts);
        })
        .catch(err => {
            res.status(500).json({ error: 'Error fetching cohorts.', err });
        });
});

server.get('/api/cohorts/:cohortid', (req, res) => {
    const { cohortid } = req.params;

    db('cohorts')
        .where({ id: cohortid })
        .then(cohort => {
            if (cohort.length === 0) {
                res.status(404).json({ error: 'No cohort with that ID found.' });
            } else {
                res.status(200).json(cohort);
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'There was an error fetching the cohort.', err });
        });
});

server.get('/api/cohorts/:cohortid/students', (req, res) => {
    const { cohortid } = req.params;

    db('students')
        .where({ cohort_id: cohortid })
        .then(students => {
            if (students.length === 0) {
                res.status(404).json({ error: 'ID not found.' });
            } else {
                res.status(200).json(students);
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'There was an error fetching students.', err });
        });
});

server.put('/api/cohorts/:cohortid', (req, res) => {
    const changes = req.body;
    const { cohortid } = req.params;

    if (!changes.name) {
        res.status(500).json({ error: 'Please provide a name field in the body.' });
    } else {
        db('cohorts')
            .where({ id: cohortid })
            .update(changes)
            .then(count => {
                if (count === 0) {
                    res.status(404).json({ error: 'Cohort with that ID not found' });
                } else {
                    res.status(200).json(count);
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'There was an error updating the cohort.', err });
            });
    }
});

server.delete('/api/cohorts/:cohortid', (req, res) => {
    const { cohortid } = req.params;

    db('cohorts')
        .where({ id: cohortid })
        .del()
        .then(count => {
            if (count === 0) {
                res.status(404).json({ error: 'Cohort with that ID not found.' });
            } else {
                res.status(200).json(count);
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'There was an error deleting the cohort.', err });
        });
});

const port = 3300;
server.listen(port, function() {
    console.log(`\n---- Lambda API Listening on http://localhost:${port} ----\n`);
});