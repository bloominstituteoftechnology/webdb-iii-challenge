const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const server = express();

//connect to the database
const db = knex( knexConfig.development )

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/', (req, res) => {
  res.send('api working')
});

server.get('/api/cohorts', (req, res) => {
  db('cohorts').then(cohort => {
    res.status(200).json(cohort);
  })
  .catch(err => res.status(500).json(err))
})

//add

server.post('/api/cohorts', (req, res) => {
  db('cohorts').insert(req.body).then(cohort => {
    res.status(200).json(cohort)
  }).catch()
})

//delete

server.delete('/api/cohorts/:id', (req, res) => {
  const id = req.params.id
  db('cohorts').where('id', id).del().then(cohort => {
    res.status(200).json(cohort)
  })
  .catch(err => res.status(500).json(err))
})

//update

server.put('/api/cohorts/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  db('cohorts')
  .where('id', id)
  .update(changes).then(change => {
    res.status(200).json(change)
  })
  .catch(err => res.status(500).json(err))
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});