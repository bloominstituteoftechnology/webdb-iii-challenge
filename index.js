const express = require('express');
const knex = require('knex');
const dbConfig = require('./knexfile')

const server = express();
const db = knex(dbConfig.development);

server.use(express.json());

// endpoints here

const port = 4545;

//cohorts endpoints
server.post('/api/cohorts', (req, res) => {
  const cohort = req.body;
  db('cohorts').insert(cohort)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ err: 'Failed to insert new cohort' })
    })
})

server.get('/api/cohorts', (req, res) => {
  db('cohorts')
    .then(cohorts => {
      res
        .json(cohorts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ err: 'Failed to get cohorts' });
    })
})

server.get('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  db('cohorts').where('id', id)
    .then(cohort => {
      if (cohort.length) {
        res.json(cohort);
      }
      else {
        res.status(404).json({ err: 'A cohort with that ID does not exist' })
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ err: "Failed to get cohort" })
    })
})

server.put('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  const cohort = req.body;
  db('cohorts')
    .where('id', id)
    .update(cohort)
    .then(rowCount => {
      res
        .json(rowCount);
    })
    .catch(err => {
      res
        .status(400)
        .json({ err: 'Failed to update cohort' })
    })
})

server.delete('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  db('cohorts')
    .where('id', id)
    .del()
    .then(count => {
      res.json(count)
    })
    .catch(err => {
      res
        .json({ err: 'Failed to delete cohort' })
    })
})

//students endpoints

server.post('/api/students', (req, res) => {
  const student = req.body;
  db('students').insert(student)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ err: 'Failed to insert new student' })
    })
})

server.get('/api/students', (req, res) => {
  db('students')
    .then(students => {
      res
        .json(students);
    })
    .catch(err => {
      res
        .status(500)
        .json({ err: 'Failed to get students' });
    })
})

server.get('/api/students/:id', (req, res) => {
  const { id } = req.params;
  db('students').where('id', id)
    .then(student => {
      if (student.length) {
        res.json(student);
      }
      else {
        res.status(404).json({ err: 'A student with that ID does not exist' })
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ err: "Failed to get the student" })
    })
})

server.put('/api/students/:id', (req, res) => {
  const { id } = req.params;
  const student = req.body;
  db('students')
    .where('id', id)
    .update(student)
    .then(rowCount => {
      res
        .json(rowCount);
    })
    .catch(err => {
      res
        .status(400)
        .json({ err: 'Failed to update student' })
    })
})

server.delete('/api/students/:id', (req, res) => {
  const { id } = req.params;
  db('students')
    .where('id', id)
    .del()
    .then(count => {
      res.json(count)
    })
    .catch(err => {
      res
        .json({ err: 'Failed to delete cohort' })
    })
})

//listening
server.listen(port, function () {
  console.log(`Listening on Local Host ${port}`);
});