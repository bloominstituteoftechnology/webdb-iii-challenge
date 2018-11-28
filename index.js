const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();
server.use(express.json());


server.post('/api/cohorts', (req, res) => {
  const cohort = req.body;

  db('cohorts')
    .insert(cohort)
    .returning('id')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ message: 'Cannot Insert', err});
    })
})

server.get('/api/cohorts', (req, res) => {
  db('cohorts')
  .then(cohorts => {
    res.status(200).json(cohorts);
  })
  .catch(err => res.status(500).json(err));
})

server.get('/api/cohorts/:id', (req, res) => {
  const id = req.params;
  db('cohorts')
    .where({ id: id })
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => res.status(500).json(err));
})