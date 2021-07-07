const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const port = 8000;

const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json(), helmet());

server.get('/api/cohorts', (req, res) => {
    db('cohorts')
        .then(cohorts => 
            res.status(200).json(cohorts))
        .catch(err =>
            res.status(404).json({error: `Server error ${err}`}))
});

server.post('/api/cohorts', (req, res) => {
  const addCohort = req.body;
   db('cohorts')
    .insert(addCohort)
    .into('cohorts')
        .then(id => 
            res.status(201).json({ id : id[0] }))
        .catch(err => 
            res.status(500).json({ error: `Server error ${err}`}))
});

server.listen(port, () => console.log(`API running on ${port} port.`))