const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const dbConfig =require('./knexfile')

const db = knex(dbConfig.development)

const server = express();

server.use(express.json());
server.use(helmet());


server.get('/', (req, res) =>{
  res.send('running')
})

server.post('/api/cohorts', (req, res) => {
  const cohort = req.body;
  db.insert(cohort)
    .into('cohorts')
    .then(ids => {
      res.status(201).json(ids)
    }).catch(err => res.status(500).json({ error: "Unable to retrieve."}))
})

server.get('/api/cohorts', (req, res) => {
  db('cohorts').then(cohorts=>{
    res.status(200).json(cohorts)
  }).catch(err => res.status(500).json({ error: "Unable to retrieve."}))
});

server.get('/api/cohorts/:id',  (req, res) => {
  const { id } =req.params;

  db('cohorts')
    .where({ id })
    .then(cohorts=>{
      res.status(200).json(cohorts)
    })
    .catch(err => res.status(500).json({ error: "Unable to retrieve."}))
})

server.get('/api/cohorts/:id/students',  (req, res) => {
  const { id } =req.params;

  db('cohorts')
    .where({ id })
    .then(cohorts=>{
      res.status(200).json(cohorts)
    })
    .catch(err => res.status(500).json({ error: "Unable to retrieve."}))
})


server.put('/api/cohorts/:id', (req, res) => {
  const { id } =req.params;

  db('cohorts')
    .where({ id })
    .update(req.body)
    .then(cohorts=>{
      res.status(200).json(cohorts)
    })
    .catch(err => res.status(500).json({ error: "Unable to retrieve."}))
})

server.delete("/api/cohorts/:id", async (req, res) => {
  const { id } =req.params;

  db('cohorts')
    .where({ id })
    .del()
    .then(cohorts=>{
      res.status(200).json(cohorts)
    })
    .catch(err => res.status(500).json({ error: "Unable to retrieve."}))
});

server.post('/api/students', (req, res) => {
  const student = req.body;
  db.insert(student)
    .into('students')
    .then(ids => {
      res.status(201).json(ids)
    }).catch(err => res.status(500).json({ error: "Unable to retrieve."}))
})

server.get('/api/students', (req, res) => {
  db('students').then(students=>{
    res.status(200).json(students)
  }).catch(err => res.status(500).json({ error: "Unable to retrieve."}))
});

server.get('/api/students/:id',  (req, res) => {
  const { id } =req.params;

  db('students')
    .where({ id })
    .then(students=>{
      res.status(200).json(students)
    })
    .catch(err => res.status(500).json({ error: "Unable to retrieve."}))
})


server.put('/api/students/:id', (req, res) => {
  const { id } =req.params;

  db('students')
    .where({ id })
    .update(req.body)
    .then(students=>{
      res.status(200).json(students)
    })
    .catch(err => res.status(500).json({ error: "Unable to retrieve."}))
})

server.delete("/api/students/:id", async (req, res) => {
  const { id } =req.params;

  db('students')
    .where({ id })
    .del()
    .then(students=>{
      res.status(200).json(students)
    })
    .catch(err => res.status(500).json({ error: "Unable to retrieve."}))
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
