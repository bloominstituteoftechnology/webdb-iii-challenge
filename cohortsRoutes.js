const express = require('express');

const dbConfig = require('./knexfile');
const knex = require('knex');
const db = knex(dbConfig.development);

const router = express.Router();

router.post('/', (req, res) => {
  const cohort = req.body;
  db('cohort')
    .insert(cohort)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => res.status(500).json(err));
});

router.get('/', (req, res) => {
  db('cohort')
    .then(cohorts => {
      res.json(cohorts);
    })
    .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('cohort')
    .where({ id })
    .first()
    .then(cohort => {
      cohort
        ? res.json(cohort)
        : res
            .status(404)
            .json({ error: `Cohort with the id of ${id} could not be found` });
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
