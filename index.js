const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);
const server = express();

server.use(express.json());

server.post('/api/cohorts', (req, res) => {
  const cohort = req.body;
  db('cohorts')
    .insert(cohort)
    .returning('id')
    .then((id) => {
      res.status(201).json(id);
    })
    .catch((err) => {
      res.status(500).json({ message: 'error adding cohort', err });
    });
});

server.get('/api/cohorts', (req, res) => {
  db('cohorts')
    .then((cohorts) => {
      res.status(200).json(cohorts);
    })
    .catch((err) => {
      res.status(500).json({ message: 'could not get cohorts' });
    });
});

server.get('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  db('cohorts')
    .where({ id })
    .then((cohort) => {
      if (cohort.length) {
        res.status(200).json(cohort);
      } else {
        res.status(404).json({ message: 'could not find cohort with that id' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'could not get cohort', err });
    });
});

server.get('/api/cohorts/:id/students', (req, res) => {
  const { id } = req.params;
  db('students')
    .where({ cohort_id: id })
    .then((students) => {
      if (students.length) {
        res.status(200).json(students);
      } else {
        res
          .status(404)
          .json({ message: 'could not find students from that cohort' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'could not get students', err });
    });
});

server.put('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db('cohorts')
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count) {
        res.status(200).json({ count });
      } else {
        res.status(404).json({ message: 'could not find cohort with that id' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'could not update cohort', err });
    });
});

server.delete('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  db('cohorts')
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json({ count })
    })
    .catch(err => {
      res.status(500).json({ message: 'could not delete cohort', err })
    });
});

server.listen(9000, () => console.log('\n== Listening on Port 9000 ==\n'));
