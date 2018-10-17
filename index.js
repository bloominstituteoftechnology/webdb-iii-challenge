const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/', (req, res) => {
  res.send('It is working!');
}); 

// read all cohorts
server.get('/api/cohorts', (req, res) => {
  db('cohorts')
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

// read cohorts by id
server.get('/api/cohorts/:id', (req, res) => {
  const id = req.params.id;
  db('cohorts').where({ id })
    .then(cohort => {
      if (cohort) {
        res.status(200).json(cohort[0]);
      } else {
        res.status(404).json({ message: 'cohort not found' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

// create cohorts
server.post('/api/cohorts', (req, res) => {
  const cohort = req.body;
  db.insert(cohort)
    .into('cohorts')
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

// update cohorts
server.put('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  const newCohort = req.body;
  db('cohorts')
    .where({ id })
    .update(newCohort)
    .then(cohort => {
      if (!cohort || cohort < 1) {
        res.status(404).json({ message: 'No records found to update' });
      } else {
        res.status(200).json(cohort);
      }
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

// delete cohorts
server.delete('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  db('cohorts')
    .where({ id })
    .del()
    .then(cohort => {
      if (!cohort || cohort < 1) {
        res.status(404).json({ message: 'No records found to delete' });
      } else {
        res.status(200).json(cohort);
      }
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

// listening port
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== API listening on http://localhost:${port} ===\n`);
});