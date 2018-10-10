const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();


server.use(helmet());
server.use(express.json());

// Add home route
server.get('/', (req, res) => {
  res.send("You are Home!");
});

// ==============================COHORTS ENDPOINTS=====================================

// Add GET ROUTE HANDLER to get the list of cohorts
server.get('/api/cohorts', (req, res) => {
  db('cohorts')
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => res.status(500).json(err));
});


server.listen(8800, () => console.log('\n===API running on 8800===\n'));