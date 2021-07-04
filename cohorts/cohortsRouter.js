const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);

router.get('/', (req, res) => {
  db('cohorts')
    .then(cohorts => res.status(200).json(cohorts))
    .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  const cohort = req.body;

  db('cohorts')
    .insert(cohort)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error inserting',
        err
      });
    });
});

router.get('/:id', (req, res) => {
  const {
    id
  } = req.params;

  db('cohorts')
    .where({ id: id })
    .then(cohort => {
      res.status(201).json({
        cohort
      });
    })
    .catch(err => res.status(500).json(err));
});

router.get('/:id/students', (req, res) => {
  const { id } = req.params;
  
  db('students')
    .where({cohort_id: id })
    .then(students => {
      res.status(201).json({ students });
    })
    .catch(err => res.status(500).json(err));
});


router.put('/:id', (req, res) => {
  const changes = req.body;
  const {
    id
  } = req.params;

  db('cohorts')
    .where({
      id: id
    })
    .update(changes)
    .then(count => {
      res.status(200).json({
        count
      });
    })
    .catch(err => res.status(500).json(err));
});


router.delete('/:id', (req, res) => {
  const {
    id
  } = req.params;

  db('cohorts')
    .where({
      id: id
    })
    .del()
    .then(count => {
      res.status(200).json({
        count
      });
    })
    .catch(err => res.status(500).json(err));
});


module.exports = router