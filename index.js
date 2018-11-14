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
})
