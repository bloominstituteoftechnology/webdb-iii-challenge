const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.post('/api/cohorts', (req, res) => {
  const cohort = req.body;

  db('cohorts').insert(cohort)
    .then(cohortId => {
      res.status(201).json(cohortId);
    })
});

server.get('/api/cohorts', (req, res) => {
  db('cohorts')
    .then(rows => {
      res.json(rows);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'failed to get cohorts' });
    });
});

server.get('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  db('cohorts').where('id', id)
    .then(rows => {
      res.json(rows);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Failed to get cohort' });
    });
});

server.put('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  const cohort = req.body;

  db('cohorts').where('id', id).update(cohort)
    .then(rowCount => {
      res.json(rowCount);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Failed to update cohort' });
    });
});


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});