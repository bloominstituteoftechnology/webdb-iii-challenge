const express = require('express')
const knex = require('knex')
const knexConfig = require('../../knexfile')
const db = knex(knexConfig.development)
const router = express.Router()

router.post('/api/cohorts', (req, res) => {
  const cohort = req.body
  if (cohort.name) {
    db('cohorts')
      .insert(cohort)
      .then(ids => {
        res.status(201).json(ids)
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: 'Failed to insert the cohort into the database' })
      })
  } else {
    res.status(400).json({ error: 'Please provide a name for the cohort' })
  }
})

router.get('/', (req, res) => {
  db('cohorts')
    .then(cohorts => {
      res.json(cohorts)
    })
    .catch(() => {
      res.status(500).json({
        error:
          'Information for this table could not be retrieved from the database.'
      })
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  db('cohorts')
    .where({ id })
    .then(cohorts => {
      res.json(cohorts)
    })
    .catch(() => {
      res.status(500).json({
        error: 'Failed to find a cohort with this id in the database.'
      })
    })
})

router.get('/:id/students', (req, res) => {
  const { id } = req.params
  db('students')
    .where('cohort_id', id)
    .then(students => {
      if (students.length) {
        res.json(students)
      } else {
        res.status(400).json({ error: 'There are no students in this cohort' })
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: 'Failed to find these students in this cohort.' })
    })
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const cohort = req.body
  db('cohorts')
    .where({ id })
    .update(cohort)
    .then(rowCount => {
      res.status(200).json(rowCount)
    })
    .catch(() => {
      res.status(500).json({ error: 'Failed to update this cohort.' })
    })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  db('cohorts')
    .where({ id })
    .del() //also can use (id : id) or ('id', id)
    .then(count => {
      if (count) {
        res.json({
          message: 'The cohort was successfully deleted from the database.'
        })
      } else {
        res.status(404).json({
          error:
            'The cohort with the specified id does not exist in the database.'
        })
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The cohort could not be removed from the database.' })
    })
})

module.exports = router
