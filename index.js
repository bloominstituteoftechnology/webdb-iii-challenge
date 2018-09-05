const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send('API Running')
})

server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    db.insert(cohort)
      .into('cohorts')
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => res.status(500).json(err));
  });
  
  server.get('/api/cohorts', (req, res) => {
    db('cohorts')
      .then(cohorts => {
        res.status(200).json(cohorts);
      })
      .catch(err => res.status(500).json(err));
  });
  
  server.get('/api/cohorts/:id', (req, res) => {
    db('cohorts')
      .then(cohorts => {
        let cohort = cohorts.find(eachCohort => {
            if (req.params.id === eachCohort.id) {
                return eachCohort;
            }
        })
        // console.log(cohort)
        res.status(200).json(cohort);
      })
      .catch(err => res.status(500).json(err));
  });
  
  server.listen(8000);