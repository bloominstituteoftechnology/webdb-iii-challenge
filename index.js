const express = require('express');
const knex = require('knex');

const knexCongif = require('./knexfile');

const db = knex(knexCongif.development)

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
        res.status(500).json({ message: 'Error inserting', err });
      });
  });




server.listen(9000, () => console.log('\n== Port 9k ==\n'));