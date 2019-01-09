const express = require('express');
const knex = require('knex');
const dbConfig = require('./knexfile.js');

const server = express();
const db = knex(dbConfig.development);

server.use(express.json());

// add to cohorts table

server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    if (cohort.name) {
        db('cohorts')
            .insert(cohort)
            .then(id => {
                res
                    .status(201)
                    .json(id);
            })
            .catch(err => {
                res
                    .status(500)
                    .json({message: 'The new cohort could not be added at this time.'});
            });
    }
    else {
        res
            .status(400)
            .json({message: 'Please include the cohort name.'});
    }
});

// get array of cohorts

server.get('/api/cohorts', (req, res) => {
    db('cohorts')
        .then(cohorts => {
            res
                .json(cohorts);
        })
        .catch(err => {
            res
                .status(500)
                .json({message: `The cohorts' information could not be retrieved at this time.`});
        });
});

// get cohort by id

server.get('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    db('cohorts')
        .where('id', id)
        .then(cohort => {
            if (cohort.length > 0) {
                res
                    .json(cohort);
            }
            else {
                res
                    .status(404)
                    .json({message: 'The cohort with the specified ID does not exist.'});
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({message: `The cohort's information could not be retrieved at this time.`});
        });
});

// get students by cohort id

server.get('/api/cohorts/:id/students', (req, res) => {
    const { id } = req.params;
    db('students')
        .where('cohort_id', id)
        .then(students => {
            if (students.length > 0) {
                res
                    .json(students);
            }
            else {
                res
                    .status(404)
                    .json({message: 'The students with the specified cohort ID do not exist.'});
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({message: `The students' information could not be retrieved at this time.`});
        });
});

// update existing cohort

server.put('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    const cohort = req.body;
    if (cohort.name) {
        db('cohorts')
            .where('id', id)
            .update(cohort)
            .then(updatedCohort => {
                if (updatedCohort) {
                    res
                        .status(201)
                        .json({message: 'The cohort was updated.'});
                }
                else {
                    res
                        .status(404)
                        .json({message: 'The cohort with the specified ID does not exist.'})
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({message: 'The cohort information could not be updated at this time.'})
            });
    }
    else {
        res
            .status(400)
            .json({message: 'Please include the updated name.'})
    }
});

const PORT = 4400;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});