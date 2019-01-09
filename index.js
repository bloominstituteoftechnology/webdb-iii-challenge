const express = require('express');
const knex = require('knex');

const dbConfig = require('./knexfile');

const server = express();
const db = knex(dbConfig.development);
const PORT = 8000;

server.use(express.json());

//POST ENDPOINTS
server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    console.log('cohorts info', cohort)
    db('cohorts').insert(cohort)
        .then(ids => {
            res.status(201).json(ids);
        }).catch(err => {
            res.status(500).json({err: 'Failed to insert'})
    });
});

server.post('/api/students', (req, res) => {
    const student = req.body;
    console.log('student info', student)
    db('students').insert(student)
        .then(ids => {
            res.status(201).json(ids);
        }).catch(err => {
            res.status(500).json({err: 'Failed to insert'})
    });
});

//GET ENDPOINTS
server.get('/api/cohorts', (req, res) => {
    db('cohorts').then(rows => {
        res.json(rows);
    }).catch(err => {
        res.status(500).json({err: "Can't get data"})
    })
})

server.get('/api/students', (req, res) => {
    db('students').then(rows => {
        res.json(rows);
    }).catch(err => {
        res.status(500).json({err: "Can't get data"})
    })
})

//GET BY ID ENDPOINTS

server.get('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    db('cohorts').where('id', id)
        .then(rows => {
            res.json(rows);
        }).catch(err => {
        res.status(500).json({err: 'Failed to find cohort'})
    })
})

server.get('/api/students/:id', (req, res) => {
    const { id } = req.params;
    db('students').where('id', id)
        .then(rows => {
            res.json(rows);
        }).catch(err => {
        res.status(500).json({err: 'Failed to find student'})
    })
})

server.put('/api/students/:id', (req, res) => {
    const { id } = req.params;
    const student = req.body;
    db('students').where('id', id).update(student)
        .then(rowCount => {
        res.json(rowCount)
        }).catch(err => {
        res.status(500).json({err: 'Failed to update student record'})
    })
})

server.put('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    const cohort = req.body;
    db('cohorts').where('id', id).update(cohort)
        .then(rowCount => {
        res.json(rowCount)
        }).catch(err => {
        res.status(201).json({err: 'Failed to update cohort'})
    })
})

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})

