const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const server = express();
const dbConfig = require('./knexfile');

const db = knex(dbConfig.development); 

server.use(express.json());
server.use(helmet());

// endpoints here
server.post('/api/cohorts', (req, res) => {
  const cohort = req.body;
  db('cohorts').insert(cohort)
  .then(ids => {
    res.status(201).json(ids);
  })
  .catch(err => {
    res.status(500).json({err:'unable to add'});
  });
});

server.get('/api/cohorts', (req, res) => {
  db('cohorts')
  .then(rows => res.json(rows))
  .catch(err => {res.status(500).json({message: 'cannot find cohort'})})
})
server.get('/api/cohorts/:id', (req, res) => {
  const {id} = req.params;
  db('cohorts').where('id', id)
  .then(cohort => {res.json(cohort)})
  .catch(err => {res.status(500).json({message: 'cannot find specified cohort'})})
})
server.delete('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;
    db('cohorts').where('id', id).del()
    .then(rowsDeleted => {res.status(201).json(rowsDeleted)})
    .catch(err => {res.status(500).json({message: "cannot delete"})})
})
server.put('/api/cohorts/:id', (req, res) => {
  const {id} = req.params;
  const cohort = req.body;
  db('cohorts').where('id', id).update(cohort)
    .then(rowCount => {res.json(rowCount)})
    .catch(err => {res.status(500).json({message:'cannot update'})})
})

const port = 3000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
