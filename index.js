const express = require('express');
const knex = require('knex');
const dbConfig = require('./knexfile');
const server = express();
const db = knex(dbConfig.development);
const PORT = 4500;

server.use(express.json());

//beginning of endpoints

// - `[POST] /api/cohorts` This route should save a new cohort to the database.
server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    db('cohorts').insert(cohort)
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Failed to insert cohort' });
        });
});

// - `[GET] /api/cohorts` This route will return an array of all cohorts.

// - `[GET] /api/cohorts/:id` This route will return the cohort with the matching `id`.
// - `[GET] /api/cohorts/:id/students` returns all students for the cohort with the specified `id`.
// - `[PUT] /api/cohorts/:id` This route will update the cohort with the matching `id` using information sent in the body of the request.
// - `[DELETE] /api/cohorts/:id` This route should delete the specified cohort.
//end of endpoints
server.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
})