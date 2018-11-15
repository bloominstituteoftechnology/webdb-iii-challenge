const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

router.get('/', (req, res) => {
  db('cohorts')
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => res.status(500).json(err))
})

router.get('/:id', (req, res) => {
  db('cohorts')
  .where({ id: req.params.id })
  .first()
  .then(cohort => {
    if (cohort) {
      res.status(200).json(cohort)
    } else {
      res.status(404).json({ message: 'A cohort with that ID could not be found' })
    }
  })
  .catch(err => res.status(500).json({ message: 'There was an error' }))
})

router.get('/:id/students', (req, res) => {
  db('cohorts')
  .where({ id: req.params.id })
  .first()
  .then(cohort => {
    if (cohort) {
      db('students')
      .where({ cohort_id: req.params.id })
      .then(students => {
        if (students) {
          res.status(200).json(students)
        } else {
          res.status(404).json({ message: 'No students were found matching that cohort' })
        }
      })
      .catch(err => res.status(500).json({ message: 'The students for that cohort could not be retrieved'}))
    } else {
      res.status(404).json({ message: 'A cohort with that ID could not be found' })
    }
  })
  .catch(err => res.status(500).json({ message: 'There was an error accessing the records for that cohort' }))
})

router.post('/', (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ message: 'Please provide a name for the cohort' })
  } else {
    db('cohorts')
    .insert(req.body)
    .into('cohorts')
    .then(id => {
      res.status(201).json(id)
    })
    .catch(err => res.status(500).json({ message: 'The record could not be created' }))
  }
})

router.delete('/:id', (req, res) => {
  db('cohorts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} records deleted` })
      } else {
        res.status(404).json({ message: 'A cohort with that ID could not be found' })
      }
    })
    .catch(err => res.status(500).json({ message: 'There was an error accessing the record' }))
})

router.put('/:id', (req, res) => {
  db('cohorts')
  .where({ id: req.params.id })
  .update(req.body)
  .then(count => {
    if (count) {
      res.status(200).json({ message: 'The cohort information has been updated' })
    } else {
      res.status(404).json({ message: 'A cohort with that ID could not be found' })
    }
  })
  .catch(err => res.status(500).json({ message: 'There was an error accessing the record' }))
})


module.exports = router;
