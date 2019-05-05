const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development)

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send("hello")
})


server.get('/api/cohorts', (req, res) => {
  db('cohorts').then(cohorts => res.status(200).json(cohorts))
    .catch(err  => res.status(500).json(err))
})

server.post('/api/cohorts', (req, res) => {
  const cohort = req.body;
    if(cohort || cohort.length) {
    db('cohorts')
      .insert(cohort)
      .then(id => res.status(201).json(id))
      .catch(err => res.status(500).json({message: "there was a problem creating the cohort"}))
    } else {
      res.status(500).json({message: 'The data was invalid'})
    }
})

server.get('/api/students', (req, res) => {
  db('students').then(students => res.status(200).json(students))
    .catch(err  => res.status(500).json(err))
})


server.get('/api/cohorts/:id', (req, res) => {
  const {id} = req.params
  db('cohorts')
    .where({id: id})
    .then(cohorts => res.status(200).json(cohorts))
    .catch(err  => res.status(500).json(err))
})


server.get('/api/cohorts/:cohort_id/students', (req, res) => {
  const {cohort_id} = req.params
  db('students')
    .where({cohort_id: cohort_id})
    .then(cohorts => res.status(200).json(cohorts))
    .catch(err  => res.status(500).json(err))
})


server.put('/api/cohorts/:cohort_id', (req, res) => {
  const changes = req.body
  const { cohort_id } = req.params;
  db('cohorts')
    .where({id: cohort_id})
    .update(changes)
    .then(count => {
      res.status(200).json({message: 'You updated a cohort'})
    } )
    .catch(err => res.status(500).json({message: 'did not update cohort'}))
})



server.delete('/api/cohorts/:cohort_id', (req, res) => {
  const {cohort_id} = req.params;
  db('cohorts')
    .where({id: cohort_id})
    .del()
    .then(count => {
      res.status(200).json({count})
    })
    .catch(err => res.status(500).json(err))
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
