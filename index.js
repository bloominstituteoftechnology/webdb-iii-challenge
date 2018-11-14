const express = require('express');
const helmet = require('helmet');
const knexConfig = require('./knexfile.js');
const knex = require('knex');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
  
});

server.get('/api/cohorts', (req,res) => {
 db('cohort')
  .then(content => {
      res.status(200).json(content)
  })
  .catch(err => res.status(500).json(err))
})

server.get('/api/cohorts/:id', (req,res) => {
    const {id}= req.params;
    db('cohort')
    .where({CohortID: id})
    .then(cohort => {
        res.status(200).json(cohort)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

server.get('/api/cohorts/:id/students', (req,res) => {
    const {id} = req.params;
    db('students')
    .where({cohort_ID: id})
    .then(students => {
        res.status(200).json(students)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

server.post('/api/cohorts', (req,res) => {
    const cohort = req.body;
    db('cohort')
    .insert([cohort])
    .returning('cohortID')
    .then(newID => {
        res.status(201).json(newID)
    })
    .catch(err => {
        res.status(200).json(err)
    })
})

server.put('/api/cohorts/:id', (req,res) => {
    const updates = req.body;
    const {id} = req.params;
    db('cohort')
    .where({cohortID: id})
    .update(updates)
    .then(count => {
        res.status(200).json(count)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

server.delete('/api/cohorts/:id', (req,res) => {
    const {id} = req.params;
    db('cohort')
    .where({cohortID: id})
    .del()
    .then(count => {
        res.status(200).json(count)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})