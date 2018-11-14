const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.get('/', (req, res) => {
    res.status(200).json({ message: 'At /'});
});

// server.post('/api/cohorts', async (req, res) => {
//     const newCohort = req.body;
//     try {
//         const test = await db('cohorts').insert(newCohort);
//         console.log('in try');
//         res.status(201).json(test);
//     } catch(err) {
//         res.status(500).json(err);
//     }
// });

server.get('/api/cohorts', async (req, res) => {
    try {
        const cohorts = await db('cohorts');
        res.status(200).json(cohorts);
    } catch(err) {
        res.status(500).json(err);
    }
});

server.get('/api/cohorts/:id', async (req, res) => {
    const cohort_id = req.params.id;
    try {
        const cohort = await db('cohorts').where({ cohort_id: cohort_id });
        res.status(200).json(cohort);
    } catch(err) {
        res.status(500).json(err);
    }
});

server.get('/api/cohorts/:id/students', async (req, res) => {
    console.log('req.params.id', req.params.id);
    const cohort_id = req.params.id;
    try {
        const students = await db('students').where({ cohort_id: cohort_id });
        res.status(200).json(students);
    } catch(err) {
        res.status(500).json(err);
    }
});


const port = 7000;
server.listen(port, () => console.log(`\nServer up on port ${port}\n`));