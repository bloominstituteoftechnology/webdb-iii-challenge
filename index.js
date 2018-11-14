const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

// endpoints here
server.post('/api/cohorts', (req, res) => {
  const cohort = req.body;

  db('cohorts')
    .insert(cohort)
    .returning('id')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error inserting', err });
    });
})

server.get('/api/cohorts', (req, res) => {
  db('cohorts')
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => res.status(500).json(err));
})

server.get('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;

  db('cohorts')
    .where({ id: id })
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => res.status(500).json(err));
})

server.put('/api/cohorts/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('cohorts')
    .where({ id: id })
    .update(changes)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

server.delete('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;

  db('cohorts')
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

server.get('/api/cohorts/:id/students', (req, res) => {
  const { id } = req.params;

  db('students')
    .where({ cohort_id: id })
    .then(students => {
      res.status(200).json({ students });
    })
    .catch(err => res.status(500).json(err));
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
