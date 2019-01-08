const express = require('express');
const knex = require('knex');
const helmet = require('helmet');

const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

//endpoints here

//saves a new cohort
server.post('/api/cohorts', (req, res) => {
  const body = req.body;
  db('cohorts').insert(body)
    .then(ids => {
      res.status(201).json(ids)
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to add cohort' })
    })
})

//returns array of all cohorts
server.get('/api/cohorts', (req, res) => {
  db('cohorts')
    .then(rows => {
      res.json(rows)
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to find cohorts' })
    })
})

//returns cohort with matching id
server.get('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  db('cohorts').where('id', id)
    .then(rows => {
      res.json(rows)
    })
    .catch(err => {
      res.status(500).json({ error: 'Invalid ID' })
    })
})

//returns all students for the cohort with the specified id
server.get('/api/cohorts/:id/students', (req, res) => {
  const { id } = req.params;
  db('students').where('id', id)
  .then(rows => {
    res.json(rows)
  })
  .catch(err => {
    res.status(500).json({ error: 'Invalid ID' })
  })
})

// updates cohort with the matching id using info sent in body of request
server.put('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  db('cohorts').where('id', id).update(body)
    .then(rowCount => {
      res.status(201).json(rowCount)
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to update cohort' })
    })
})

// deletes specified cohort
server.delete('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  db('cohorts').where('id', id).delete()
    .then(rowCount => {
      res.json(rowCount)
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to delete cohort' })
    })
})

const port = 3000;
server.listen(port, () => {
  console.log(`\n=== API Listening on http://localhost${port} ===\n`)
})