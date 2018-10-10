const express = require('express')
const knex = require('knex')
const knexConfig = require('../knexfile.js')

const router = express.Router()
const db = knex(knexConfig.development)

router.route('/')
  .get((req, res) => {
    db('cohorts')
      .then(cohorts => res.status(200).json(cohorts))
      .catch(err => res.status(500).json({ error: 'Could not retrieve any cohorts.' }))
  })
  .post((req, res) => {
    const cohort = req.body
    db.insert(cohort)
      .into('cohorts')
      .then(cohort => res.status(201).json(cohort))
      .catch(err => res.status(500).json({ error: 'The cohort could not be added.' }))
  })

router.route('/:id')
  .get((req, res) => {
    const { id } = req.params
    db('cohorts')
      .where({ id })
      .then(cohort => {
        if (!cohort || cohort < 1) return res.status(404).json({ error: 'The specified cohort could not be found.'})
        return res.status(200).json(cohort)
      })
      .catch(err => res.status(500).json({ error: 'Could not get the specified cohort.' }))
  })
  .put((req, res) => {
    const { id } = req.params
    const changedCohort = req.body
    db('cohorts')
      .where({ id })
      .update(changedCohort)
      .then(updatedCohort => {
        if (!updatedCohort || updatedCohort < 1) return res.status(404).json({ error: 'The specific cohort could not be found.' })
        return res.status(200).json(updatedCohort)
      })
      .catch(err => res.status(500).json({ error: 'The specified cohort could not be updated.' }))
  })
  .delete((req, res) => {
    const { id } = req.params
    db('cohorts')
      .where({ id })
      .delete(id)
      .then(deletedCohort => {
        if (!deletedCohort || deletedCohort < 1) return res.status(404).json({ error: 'The specified cohort could not be found.' })
        return res.status(202).json(deletedCohort)
      })
      .catch(err => res.status(500).json({ error: 'The specified cohort could not be deleted.' }))
  })

router.route('/:id/students')
  .get((req, res) => {
    const { id } = req.params
    db('students')
      .where('cohort_id', id)
      .then(cohort => {
        if (!cohort || cohort < 1) return res.status(404).json({ error: 'Could not retrived students of that cohort and ID.' })
        return res.status(200).json(cohort);
      })
      .catch(err => res.status(500).json({ error: 'Could not retrieve the specified student.' }))
  })

module.exports = router
