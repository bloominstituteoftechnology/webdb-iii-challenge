const express = require('express');
const knex = require('knex');

const dbConfig = require('./knexfile');

const server = express();
const db = knex(dbConfig.development);
const PORT = 3000;

server.use(express.json());     //body parser middleware


// [POST] /api/cohorts This route should save a new cohort to the database.
// INSERT INTO cohorts (name) VALUES ('fullstack1')
server.post('/cohorts', (req , res) => {
    const cohort = req.body;
    console.log('cohort info', cohort)
    db('cohorts').insert(cohort)
    .then(ids => {
        res.status(201).json(ids);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err: 'Failed to insert cohort'});
    });
});

// [GET] /api/cohorts This route will return an array of all cohorts.
// SELECT * FROM cohorts;
server.get('/cohorts', (req , res) => {
    db('cohorts')
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err: "Failed to find cohort"});
    })
});

// [GET] /api/cohorts/:id This route will return the cohort with the matching id.
// SELECT * FROM cohorts WHERE id = '3'
server.get('/cohorts/:id', (req , res) => {
    const {id} = req.params;
    db('cohorts').where('id', id)
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err: 'Failed to find specific cohort'});
    })
});

//  [GET] /api/cohorts/:id/students returns all students for the cohort with the specified id.

// [PUT] /api/cohorts/:id This route will update the cohort with the matching id using information sent in the body of the request.
// UPDATE cohorts SET name = 'fullstack1' WHERE id = 2
server.put('/cohorts/:id', (req , res) => {
    const {id} = req.params;
    const cohort = req.body;

    db('cohorts').where('id', id).update(cohort)
    .then(rowCount => {
        res.status(200).json(rowCount)
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to update cohort'});
    })
})

//SERVER LISTEN
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});