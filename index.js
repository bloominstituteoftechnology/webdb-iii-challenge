const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.json({ api: 'up' });
  });

// add a new cohort
server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
  
    db('cohorts')
      .insert(cohort)
      .then(id => {
        res.status(201).json(id);
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ error: "Cannot post a new cohort" });
      });
});

// get all cohorts
server.get('/api/cohorts', (req, res) => {
    db('cohorts')
      .then(cohort => res.status(200).json(cohort))
      .catch(err => res.status(500).json(err));
});

//get cohort by id
server.get('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;

    db('cohorts').where({ id }).then(cohort => {
      if (cohort.length !== 0) {
        res.status(200).json(cohort)
      } else {
        res.status(404).json({ message: "The cohort with the specified id does not exist." });
      }
    }).catch(error => {
      res.status(500).json({ error: "Cant get cohort data." });
    });
});


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});