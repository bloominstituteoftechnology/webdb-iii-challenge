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
      res.status(500).json({ message: 'Cannot Insert', err})
    })
})

