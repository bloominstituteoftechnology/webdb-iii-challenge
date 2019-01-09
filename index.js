// define dependancies
const express = require('express');
const knex = require('knex');
const dbConfig = require('./knexfile');

const server = express();
const db = knex(dbConfig.development);
const PORT = 5000;



// Json time
server.use(express.json());

server.listen(PORT, function() {
    console.log(" API listening on port 5000\n");
});

// Main route
server.get('/api',(req,res) => {
    res.send("Server is up and running");
});

// GET cohorts
server.get('/api/cohorts',(req,res) => {
    db('cohorts').then(cohorts => res.status(200).json(cohorts))
    .catch(err => res.status(500).json({err : "Could not find cohorts"}));
});

// GET cohorts by ID
server.get('api/cohorts/:id',(req,res) => {
    const { id } = req.params;

    db("cohorts").where({id : id}).then(cohort => {
        res.status(200).json(cohort);
    }).catch(err => res.status(500).json({err : "Could not get Ids"}));
});

// PUT cohorts
server.put('api/cohorts/:id',(req,res) => {
    const change = req.body;
    const { id } = req.params;

    db('cohorts')
        .where({id : id})
        .update(changes)
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err = res.status(500).json({err : "Could not update cohorts"}));
});

// GET students by cohortID
server.get('api/cohorts/:id/students',(req,res) => {
    const { id } = req.params;

    db('students').where({ cohort_id : id }).then(students =>
        res.status(200).json(students));
});

// POST cohort
server.post('/api/cohorts',(req,res) => {
    const cohort = req.body;
   
    db('cohorts')
        .insert(cohort)
        .returning('id')
        .then(id => {
            res.status(201).json(id)
        })
        .catch(err => {
            res.status(500).json({err : "Could not POST cohorts"})
        });
});

// DELETE cohorts
server.delete('api/cohorts/:id',(req,res) => {
       const { id } = req.params;

        db('cohorts')
            .where({id : id})
            .truncate()
            .then(count => {
                res.status(200).json(count);
            })
            .catch(err => res.status(500).json({err : "Could not delete" }));
});
