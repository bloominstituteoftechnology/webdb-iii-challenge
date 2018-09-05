const express = require('express');
const router = express.Router();
const db = require('../dbConfig.js');

router.get('/', (req, res, next) => {
  db('students')
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
  db('students')
    .where({ id: req.params.id })
    .then(data => {
      if (data.length < 1) {
        return next({ code: 404 });
      }
      res.status(200).json(data);
    })
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  const body = req.body;
  if (!(body.name && body.cohort_id)) {
    return next({ code: 400 });
  }
  db('cohorts')
    .where({ id: body.cohort_id })
    .then(cohort => {
      if (cohort.length < 1) {
        return next({ code: 404 });
      }
    });
  db.insert(body)
    .into('students')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => next(err));
});

router.put('/:id', (req, res, next) => {
  const body = req.body;
  if (!(body.name && body.cohort_id)) {
    return next({ code: 400 });
  }
  db('cohorts')
    .where({ id: body.cohort_id })
    .then(cohort => {
      if (cohort.length < 1) {
        return next({ code: 404 });
      }
    });
  db('students')
    .where({ id: req.params.id })
    .update(body)
    .then(response => {
      if (!response) {
        return next({ code: 404 });
      }
      res.status(200).json({
        id: req.params.id,
        name: body.name,
        cohort_id: body.cohort_id,
      });
    })
    .catch(err => next(err));
});

module.exports = router;
