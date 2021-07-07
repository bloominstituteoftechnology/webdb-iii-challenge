 const express = require('express');
const router = express.Router();
const knex = require('knex');

const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

router.get('/', (req, res) => {
  db('students')
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => res.status(500).json(err))
})

router.get('/:id', (req, res) => {
  db('students')
  .where({ id: req.params.id })
  .first()
  .then(student => {
    if (student) {
      res.status(200).json(student)
    } else {
      res.status(404).json({ message: 'A student with that ID could not be found' })
    }
  })
  .catch(err => res.status(500).json({ message: 'There was an error' }))
})

router.post('/', (req, res) => {
  if (!req.body.name || !req.body.cohort_id) {
    res.status(400).json({ message: 'Please make sure the name and the cohort_id for the student are both included' })
  } else {
    db('students')
    .insert(req.body)
    .into('students')
    .then(id => {
      res.status(201).json(id)
    })
    .catch(err => res.status(500).json({ message: 'The record could not be created' }))
  }
})



router.delete('/:id', (req, res) => {
  db('students')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} records deleted` })
      } else {
        res.status(404).json({ message: 'A student with that ID could not be found' })
      }
    })
    .catch(err => res.status(500).json({ message: 'There was an error accessing the record' }))
})

router.put('/:id', (req, res) => {
  db('students')
  .where({ id: req.params.id })
  .update(req.body)
  .then(count => {
    if (count) {
      res.status(200).json({ message: 'The student information has been updated' })
    } else {
      res.status(404).json({ message: 'A student with that ID could not be found' })
    }
  })
  .catch(err => res.status(500).json({ message: 'There was an error accessing the record' }))
})

module.exports = router;
