const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

//cohort endpoints

//GET all cohorts
server.get('/api/cohorts', (req, res) => {
  db('cohorts')
    .then(cohorts => res.status(200).json(cohorts))
    .catch(err => res.status(500).json(err));
});

//GET cohort by id
server.get('/api/cohorts/:cohortid', (req, res) => {
  const { cohortid } = req.params;
  
  db('cohorts')
  .where({id: cohortid})
  .then(cohorts => res.status(200).json(cohorts))
  .catch(err => res.status(500).json(err));
});

//GET students in cohort by the cohort id
server.get('/api/cohorts/:cohortid/students', (req, res) => {
  const { cohortid } = req.params;
  
  db('students')
  .where({cohort_id: cohortid})
  .then(cohorts => res.status(200).json(cohorts))
  .catch(err => res.status(500).json(err));
});

//POST add cohort
server.post('/api/cohorts', (req, res) => {
  const cohort = req.body;
  
  db('cohorts')
    .insert(cohort)
    .returning('id')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error inserting', err });
    });
});

//PUT cohort by id
server.put('/api/cohorts/:cohortid', (req, res) => {
  const changes = req.body;
  const { cohortid } = req.params;

  db('cohorts')
    .where({ id: cohortid })
    .update(changes)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

//DELETE cohort by id
server.delete('/api/cohorts/:cohortid', (req, res) => {
  const { cohortid } = req.params;

  db('cohorts')
    .where({ id: cohortid })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});





// server endpoint
server.get('/', (req, res) => {
  res.json({ api: 'up and running!' });
});

server.listen(9000, () => console.log('\n== On Port 9000 ==\n'));