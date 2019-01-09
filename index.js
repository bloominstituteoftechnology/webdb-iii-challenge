const express = require('express');
const knex = require('knex');

const dbConfig = require('./knexfile');

const server = express();
const db = knex(dbConfig.development);
const PORT = 5002;

server.use(express.json());

//MVP Endpoints

//GET
server.get('/api/cohorts', (req, res) => {
    db('cohorts')
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to get cohorts'})
    })
})

//GET by ID
server.get('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;
    db('cohorts').where('id', id)
    .then(rows => {
        res.json(rows);
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to get that cohort'})
    })
})

//GET students buy cohort ID
server.get('/api/cohorts/:id/students', (req, res) => {
    const {id} = req.params;
    db('students').where('cohort_id', id)
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to find those students in that cohort'})
    })
})

//Create new cohort
server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    if (cohort.name) {
        db('cohorts').insert(cohort)
        .then(ids => {
            res.status(201).json(ids)
        })
        .catch(err => {
            res.status(500).json({err: 'Failed to insert cohort'})
        })
    }
})

//update cohort by ID
server.put('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;
    const cohort = req.body;

    db('cohorts').where('id', id).update(cohort)
    .then(rowCount => {
        res.json(rowCount)
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to update cohort'})
    })
})

//delete cohort by ID
server.delete('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;

    db('cohorts').where('id', id).del()
    .then(rowCount => {
        res.status(201).json(rowCount)
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to delete that cohort'})
    })
})



//Stretch Goal endpoints

server.get('/api/students', (req, res) => {
    db('students')
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to get students'})
    })
})

server.get('/api/students/:id', (req, res) => {
    const {id} = req.params;

    db('students').where('id', id)
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to get that student'})
    })
})

server.post('/api/students', (req, res) => {
    const student = req.body;

    if(student.name && student.cohort_id) {
        db('students').insert(student)
        .then(ids => {
            res.status(201).json(ids)
        })
        .catch(err => {
            res.status(500).json({err: 'Failed to create new student'})
        })
    }
})

server.put('/api/students/:id', (req, res) => {
    const {id} = req.params;
    const student = req.body;

    if(student.name && student.cohort_id) {
        db('students').where('id', id).update(student)
        .then(rowCount => {
            res.json(rowCount)
        })
        .catch(err => {
            res.status(500).json({err: 'Failed to update student'})
        })
    }
})

server.delete('/api/students/:id', (req, res) => {
    const {id} = req.params;

    db('students').where('id', id).del()
    .then(rowCount => {
        res.status(201).json(rowCount)
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to delete student'})
    })
})


server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
