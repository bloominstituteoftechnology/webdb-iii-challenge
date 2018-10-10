const express = require('express');
const knex = require('knex');
const helmet = require('helmet');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();
server.use(express.json());
server.use(helmet());

// add to cohorts data

server.post('api/cohorts', (req, res) => {
  const { name } = req.body;
  const cohort = { name };
  db.insert(cohort)
    .into('cohorts')
    .then(newCohort => res.status(201).json(newCohort))
    .catch(err => res.status(500).json(err));
});

// get current cohorts data

server.get('/api/cohorts', (req, res) => {
  db('cohorts')
    .then(cohorts => res.status(200).json(cohorts))
    .catch(err => res.status(500).json(err));
});

// get specific cohort data

server.get('api/cohorts/:id', (Req, res) => {
  const { id } = req.params;
  db('cohorts')
    .where({id})
    .first()
    .then(cohort => res.status(200).json(cohort))
    .catch(err => res.status(500).json(err));
});

// instantiate server

const port = 8000;
server.listen(port, () => console.log(`Server listening on port ${port}.`));
