const express = require('express');
const router = express.Router();
const db = require('../dbConfig.js');

router.get('/', (req, res, next) => {
  db('cohorts')
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
  db('cohorts')
    .where({ id: req.params.id })
    .then(cohort => {
      if (cohort.length < 1) {
        return next({ code: 404 });
      }
      res.status(200).json(cohort);
    })
    .catch(err => next(err));
});

router.get('/:id/students', (req, res, next) => {
  db('students')
    .where({ cohort_id: req.params.id })
    .then(cohorts => {
      if (cohorts.length < 1) {
        return next({ code: 404 });
      }
      res.status(200).json(cohorts);
    })
    .catch(err => next(err));
});

module.exports = router;
