const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

// //get test
// server.get('/', (req, res) => {
//     res.send('api is a go');
// });

//[POST] /api/cohorts This route should save a new cohort to the database.
server.post('/api/cohorts' , (req, res) => {
    db('cohorts')
        .insert(req.body)
        .then(ids => {
            res.status(201).json(ids)
        })
        .catch(err => res.status(500).json(err))
});

// //[GET] /api/cohorts This route will return an array of all cohorts.
server.get('/api/cohorts', (req, res) => {
    db('cohorts')
        .then(cohorts => {
            res.status(200).json(cohorts)
        })
        .catch(err => res.status(500).json(err))
});

// //[GET] /api/cohorts/:id This route will return the cohort with the matching id.
server.get('/api/cohorts/:id', (req, res) => {
    db('cohorts')
        .where({ id: req.params.id })
        .then(ids => {
            res.status(200).json(ids)
        })
        .catch(err => {
            message: "could not find the requested cohort"
        })
});

// //[GET] /api/cohorts/:id/students returns all students for the cohort with the specified id
server.get('/api/cohorts/:id/students', (req, res) => {
    db('students')
        .where({ cohort_id: req.params.id })
        .then(ids => {
            res.status(200).json(ids)
        })
        .catch(err => {
            message: "could not find the requested cohort"
        })
})

// //[PUT] /api/cohorts/:id This route will update the cohort with the matching id using information sent in the body of the request.
server.put('/api/cohorts/:id', (req, res) => {
    const changes = req.body

    db('cohorts')
        .where({ id: req.params.id })
        .update(changes)
        .then(count => {
            res.status(200).json(count)
        })
        .catch(err => {
            message: "unable to update cohort"
        })
})

// //[DELETE] /api/cohorts/:id This route should delete the specified cohort.
server.delete('/api/cohorts/:id', (req, res) => {
    db('cohorts')
        .where({ id: req.params.id })
        .del()
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err => {
            message: "could not delete cohort"
        })
});


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});