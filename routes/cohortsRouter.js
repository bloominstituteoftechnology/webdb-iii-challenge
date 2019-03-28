const express = require('express');
const route = express.Router();

const db = require('../dataConfig')

route.post('/', (req, res) => {
    const { name } = req.body;
    db('cohorts')
      .insert({ name })
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        res.status(500).json({ message: 'you need a name', err });
      });
  });

  route.get('/', (req, res) => {
    db('cohorts')
      .then(cohorts => {
        res.status(200).json(cohorts);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  route.get('/:id/students', (req, res) => {
    const id = req.params.id;
    db('cohorts')
      .join('students', 'students.cohort_id', 'cohorts.id')
      .select('students.id', 'students.name')
      .where('cohorts.id', id)
      .then(ids => {
        if (ids) {
          res.status(200).json(ids);
        } else {
          res.status(404).json({ message: 'no students available' });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  