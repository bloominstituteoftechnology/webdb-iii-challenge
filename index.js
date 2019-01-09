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


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});