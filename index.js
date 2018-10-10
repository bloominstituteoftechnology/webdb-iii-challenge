const express = require('express');
const helmet = require('helmet');

const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);


const server = express();


server.use(helmet())
server.use(express.json());

server.get('/api/cohorts', (req, res) => {
    db('cohorts')
    	.then(cohorts => res.status(200).json(cohorts))
      .catch(err => res.status(404).json({error: `Server error --> ${err}`}))
});

server.post('/api/cohorts', (req, res) => {
  const addCohort = req.body;

  db('cohorts')
    .insert(addCohort)
    .into('cohorts')
    	.then(id => res.status(201).json({ id : id[0] }))
      .catch(err => res.status(500).json({ error: `Server error --> ${err}`}))
});

const port = 8000;
server.listen(port, () => console.log(`Sever running on ${port} port.`))