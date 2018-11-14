const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.post('/api/cohorts', (req, res) => {
  const cohort = req.body;

  if (!corhort.name){
    res.status(401).json({message: "name is required"});
    return;
  }

  db('cohorts')
    .insert(cohort)
    .returning('id')
    .then(ids => res.status(201).json(ids))
    .catch(error => res.status(500).json({message:'error posting cohort', error}));

})

server.get('/api/cohorts', (req, res) => {
  db('cohorts')
    .then(cohorts => res.status(200).json(cohorts))
    .catch(error => res.status(500).json(error));
})

server.get('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;

  db('cohorts')
    .where({id})
    .then(cohort => {
      if (!cohort.length) {
        res.status(404).json({message: 'cohort by id not found'})
        return
      }
      res.status(200).json({cohort})
    })
    .catch(error => res.status(500).json({message: 'error getting cohort by id', error}))

})

server.delete('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;

  db('cohorts')
    .where({id})
    .del()
    .then(count => {
      res.status(200).json({message: `${count} cohorts deleted`})
    })
    .catch(error => res.status(500).json({message: 'error deleting cohort by id', error}))

})

server.put('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;

  const cohort = req.body;

  if (!cohort.name){
    res.status(401).json({message: "name is required"});
    return;
  }

  db('cohorts')
    .where({id})
    .update({name: cohort.name})
    .then(count => res.status(200).json({message: `${count} cohorts updated`}))
    .catch(error => res.status(500).json({message: 'error updating cohort by id', error}))

})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
