const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');
const server = express();

server.use(express.json())

const db = knex(knexConfig.development)



server.post('/api/cohorts',(req, res) =>{
    db('cohorts')
    .insert(req.body)
    .then(ids => {
      db('cohorts')
        .where({ id: ids[0] })
        .then(cohort => {
          res.status(201).json(cohort);
        });
    })
    .catch(err => res.status(500).json(err))
})



server.listen(5000, () => console.log('up and at em!'));


