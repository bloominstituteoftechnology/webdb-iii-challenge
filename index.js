// define dependancies
const express = require('express');
const knex = require('knex');
const dbConfig = require('./knexfile');

const server = express();
const db = knex(dbConfig.development);
const PORT = 5000;

// Json time
server.use(express.json());

// Build post for cohorts
server.post('/cohorts', (req, res) => {
    const Cohort = req.body;
    db('cohorts').insert(Cohort)
    .then(ids => {
        res.status(201).json(ids);
    })
    .catch(err => {
        res.status(500).json({err : "Cohort insert failed.."});
    });
});

// Build post for students
