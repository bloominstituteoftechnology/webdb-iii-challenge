const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/', (req, res) => {
  res.send('API Running?');
});

// add a cohort
server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
  
    // console.log(cohort);
  
    // insert into cohorts () values ()
    // db('cohorts').insert(cohort).then().catch()
    db.insert(cohort)
      .into('cohorts')
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => res.status(500).json(err));
});
  
server.get('/api/cohorts', (req, res) => {
    db('cohorts')
      // .select('name')
      .then(cohorts => {
        res.status(200).json(cohorts);
      })
      .catch(err => res.status(500).json(err));
});

const port = 3400;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});