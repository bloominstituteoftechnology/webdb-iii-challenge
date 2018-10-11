const express = require('express')
const knex = require('knex')
const knexConfig = require('../knexfile.js')

const router = express.Router()
const db = knex(knexConfig.development)

router.route('/')
  .get((req, res) => {
    db('students')
      .then(students => res.status(200).json(students))
      .catch(err => res.status(500).json({ error: 'Could not retrieve any students.' }))
  })
  .post((req, res) => {
    const student = req.body
    db.insert(student)
      .into('students')
      .then(student => res.status(201).json(student))
      .catch(err => res.status(500).json({ error: 'The student could not be added.' }))
  })

router.route('/:id')
  .get((req, res) => {
    const { id } = req.params
    db('students')
      .select('students.id', 'students.name', 'cohorts.name as cohort')
      .join('cohorts', 'students.cohort_id', 'cohorts.id')
      .where('students.id', id)
      .then(student => {
        if (!student || student < 1) return res.status(404).json({ error: 'The specified student could not be found.'})
        return res.status(200).json(student)
      })
      .catch(err => res.status(500).json({ error: 'Could not get the specified student.' }))
  })
  .put((req, res) => {
    const { id } = req.params
    const changedStudent = req.body
    db('students')
      .where({ id })
      .update(changedStudent)
      .then(updatedStudent => {
        if (!updatedStudent || updatedStudent < 1) return res.status(404).json({ error: 'The specific student could not be found.' })
        return res.status(200).json(updatedStudent)
      })
      .catch(err => res.status(500).json({ error: 'The specified student could not be updated.' }))
  })
  .delete((req, res) => {
    const { id } = req.params
    db('students')
      .where({ id })
      .delete(id)
      .then(deletedStudent => {
        if (!deletedStudent || deletedStudent < 1) return res.status(404).json({ error: 'The specified student could not be found.' })
        return res.status(202).json(deletedStudent)
      })
      .catch(err => res.status(500).json({ error: 'The specified student could not be deleted.' }))
  })

module.exports = router