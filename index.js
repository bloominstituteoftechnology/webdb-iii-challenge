const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.json({ api: 'get ready for cohorts!' });
});

//GET cohorts
server.get('/api/cohorts', (req, res) => {
  db('cohorts')
    .then(cohorts => res.status(200).json(cohorts))
    .catch(err =>
      res.status(500).json({
        message: 'The cohorts could not be retrieved.',
        error: err
      })
    );
});

//GET cohorts by id
server.get('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  db('cohorts')
    .where({ id })
    .then(cohort => {
      if (cohort) {
        res.status(200).json(cohort);
      } else {
        res.status(404).json({
          message: 'The cohort with the specified ID does not exist.',
          error: err
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'The cohort information could not be retrieved.',
        error: err
      });
    });
});

//GET students by cohort id
server.get('/api/cohorts/:id/students', (req, res) => {
  const { id } = req.params;
  db('students')
    .where({ cohort_id: id })
    .then(cohort => {
      if (cohort) {
        res.status(200).json(cohort);
      } else {
        res.status(404).json({
          message: 'The student information could not be retrieved.',
          error: err
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'The student information could not be retrieved.',
        error: err
      });
    });
});

//POST add a cohort
server.post('/api/cohorts', (req, res) => {
  const cohort = req.body;
  db('cohorts')
    .insert(cohort)
    .returning('id')
    .then(id => res.status(201).json(id))
    .catch(err =>
      res
        .status(500)
        .json({ message: 'Your cohort could not be added.', error: err })
    );
});

//DELETE a cohort
server.delete('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  db('cohorts')
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: 'Your cohort could not be deleted.', error: err })
    );
});

//PUT update the cohort
server.put('/api/cohorts/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  db('cohorts')
    .where({ id })
    .update(changes)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: 'Your cohort could not be udpated.', error: err })
    );
});

//GET students
server.get('/api/students', (req, res) => {
  db('students')
    .then(students => res.status(200).json(students))
    .catch(err =>
      res.status(500).json({
        message: 'The students could not be retrieved.',
        error: err
      })
    );
});

//GET students by id
server.get('/api/students/:id', (req, res) => {
  const { id } = req.params;
  db('students')
    .where('students.id', id)
    .join('cohorts', 'cohorts.id', 'students.cohort_id')
    .select('students.id', 'students.name', 'cohorts.name as cohort')
    .then(student => {
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({
          message: 'The student with the specified ID does not exist.',
          error: err
        });
      }
    });
});

//POST add a student
server.post('/api/students', (req, res) => {
  const student = req.body;
  db('students')
    .insert(student)
    .returning('id')
    .then(id => res.status(201).json(id))
    .catch(err =>
      res
        .status(500)
        .json({ message: 'The student could not be added.', error: err })
    );
});

//DELETE a student
server.delete('/api/students/:id', (req, res) => {
  const { id } = req.params;
  db('students')
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: 'The student could not be deleted.', error: err })
    );
});

//PUT update a student
server.put('/api/students/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  db('students')
    .where({ id })
    .update(changes)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: 'The student could not be updated.', error: err })
    );
});

const port = 8000;
server.listen(port, function() {
  console.log(`\n=== Web API listening on http://localhost:${port} ===\n`);
});
