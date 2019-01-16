const express = require('express');
const knex = require('knex');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();
const port = 8000;

server.use(express.json());

server.post('/api/cohorts', (req, res) => {
  const cohort = req.body;
  db('cohorts')
    .insert(cohort)
    .then(id => res.status(201).json(id))
    .catch(err => res.status(500).json(err));
});

server.get('/api/cohorts', (req, res) => {
  db('cohorts')
    .then(cohortInfo => res.json(cohortInfo))
    .catch(err => res.status(500).json(err));
});

server.get('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  db('cohorts')
    .where('id', id)
    .then((cohortId) => {
      if (cohortId.length > 0) res.json(cohortId);
      else res.status(404).json({ error: 'The cohort with the specified ID does not exist' });
    })
    .catch(err => res.status(500).json(err));
});

server.get('/api/cohorts/:id/students', (req, res) => {
  const { id } = req.params;
  db('students')
    .where('cohort_id', id)
    .then(cohortStudents => res.json(cohortStudents))
    .catch(err => res.status(500).json(err));
});

server.put('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) res.status(400).json({ error: 'A name is required for the cohort' });
  else {
    db('cohorts')
      .where('id', id)
      .update({ name })
      .then((updatedRows) => {
        if (updatedRows) res.json(updatedRows);
        else res.status(404).json({ error: 'The cohort with the specified ID does not exist' });
      })
      .catch(err => res.status(500).json(err));
  }
});

server.delete('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  db('cohorts')
    .where('id', id)
    .del()
    .then((deletedRows) => {
      if (deletedRows) res.status(201).json(deletedRows);
      else res.status(404).json({ error: 'The cohort with the specified ID does not exist' });
    })
    .catch(err => res.status(500).json(err));
});

server.listen(port, () => {
  console.log(`\nWeb API running on http://localhost:${port}\n`);
});
