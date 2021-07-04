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
  db('cohorts')
    .leftJoin('students', 'cohorts.id', 'students.cohort_id')
    .where('cohorts.id', req.params.id)
    .select({
      id: 'students.id',
      name: 'students.name',
      cohort: 'cohorts.name',
    })
    .then(cohorts => {
      if (cohorts.length < 1) {
        return next({ code: 404 });
      }
      res.status(200).json(cohorts);
    })
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  const body = req.body;
  if (!body.name) {
    return next({ code: 400 });
  }
  db.insert(body)
    .into('cohorts')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => next(err));
});

router.put('/:id', (req, res, next) => {
  let body = req.body;
  if (!body.name) {
    return next({ code: 400 });
  }
  db('cohorts')
    .where({ id: req.params.id })
    .update(body)
    .then(response => {
      if (!response) {
        return next({ code: 404 });
      }
      res.status(200).json({ id: req.params.id, name: body.name });
    })
    .catch(err => next(err));
});

router.delete('/:id', (req, res, next) => {
  db('cohorts')
    .where({ id: req.params.id })
    .del()
    .then(data => {
      if (!data) {
        return next({ code: 404 });
      }
      res.status(200).json({ id: req.params.id });
    })
    .catch(err => next(err));
});

module.exports = router;
