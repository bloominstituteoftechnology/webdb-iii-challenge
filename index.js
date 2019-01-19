const express = require('express');
const knex = require('knex');

const dbConfig = require('./knexfile');

const server = express();
const db = knex(dbConfig.development);
const PORT = 8070;

server.use(express.json());

server.get('/api/cohorts', (req, res) => {
    // I'm a get for cohorts
    db('cohorts').then(rows => {
        res.json(rows);
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to find cohorts'})
    })
})

server.get('/api/cohorts/:id', (req, res) => {
    // I'm a get by id
    const {id} = req.params;
    db('cohorts').where('id', id)
    .then(rows => {
        res.json(rows);
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to find that cohort'})
    })
})

server.get('/api/cohorts/:id/students', (req, res) => {
    // I'm a get-some-students-by-cohort-id
    const {id} = req.params;
    db('students').where('cohort_id', id)
    .then(rows => {
        res.json(rows);
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to find students in that cohort'})
    })
})


server.post('/api/cohorts', (req, res) => {
    // I'm a post request
    const cohort = req.body;
    db('cohorts').insert(cohort)
    .then(ids => {
        res.status(201).json(ids);
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to insert this cohort'})
    })
})

server.post('/api/students', (req, res) => {
    const student = req.body;
    console.log('yo')
    db('students').insert(student)
    .then(ids => {
        res.status(201).json(ids)
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to insert this student'})
    })
})

server.put('/api/cohorts/:id', (req, res) => {
    // I'm a put request
    const {id} = req.params;
    const cohort = req.body;

    db('cohorts').where('id', id).update(cohort)
    .then(rowCount => {
        res.status(201).json(rowCount);
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to update that cohort'})
    })
})

server.delete('/api/cohorts/:id', (req, res) => {
    // I'm a delete request
    const {id} = req.params;
    db('cohorts').where('id', id).del()
    .then(rowCount => {
        res.status(201).json(rowCount)
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to delete that cohort'})
    });
})

// student endpoints
server.get('/api/students', (req, res) => {
    db('students').then(rows => {
        res.status(201).json(rows)
    })
    .catch(err => {
        res.status(500).json({err: 'Could not find students'})
    })
})

server.listen(PORT, () => {
    console.log(`I'm alive, awake, alert, and enthusiastic on port ${PORT}`)
})