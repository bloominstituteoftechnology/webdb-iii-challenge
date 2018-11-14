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

router.get('/:cohortId', (req, res) => {
  const {
    cohortId
  } = req.params;

  db('cohorts')
    .where({ id: cohortId })
    .then(cohort => {
      res.status(201).json({
        cohort
      });
    })
    .catch(err => res.status(500).json(err));
});

router.put('/:cohortId', (req, res) => {
  const changes = req.body;
  const {
    cohortId
  } = req.params;

  db('cohorts')
    .where({
      id: cohortId
    })
    .update(changes)
    .then(count => {
      res.status(200).json({
        count
      });
    })
    .catch(err => res.status(500).json(err));
});


router.delete('/:cohortId', (req, res) => {
  const {
    cohortId
  } = req.params;

  db('cohorts')
    .where({
      id: cohortId
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