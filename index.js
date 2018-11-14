const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.json({ api: 'get ready for cohorts!' });
});

//sanity check
const port = 8000;
server.listen(port, function() {
  console.log(`\n=== Web API listening on http://localhost:${port} ===\n`);
});

//GET cohorts
server.get('/api/cohorts', (req, res) => {
  db('cohorts')
    .then(cohorts => res.status(200).json(cohorts))
    .catch(err =>
      res
        .status(500)
        .json({
          message: 'The requested cohort could not be retrieved.',
          error: err
        })
    );
});

//GET cohorts by id

//GET students by cohort id

//POST add a cohort

//DELETE a cohort

//PUT update the cohort
