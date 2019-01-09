const express = require('express');

const dbConfig = require('./knexfile');
const knex = require('knex');
const db = knex(dbConfig.development);

const router = express.Router();

router.get('/', (req, res) => {
  db('cohort')
    .then(cohorts => {
      res.json(cohorts);
    })
    .catch(err => res.json(err));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('cohort')
    .where({ id })
    .first()
    .then(cohort => {
      res.json(cohort);
    })
    .catch(err => res.json(err));
});

module.exports = router;
