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

// listening port
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== API listening on http://localhost:${port} ===\n`);
});