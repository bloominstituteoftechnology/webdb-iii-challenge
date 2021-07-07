const express = require('express')
const knex = require('knex')

const knexConfig = require('../../knexfile.js')
const db = knex(knexConfig.development)

const router = express.Router()

router.post('/', (req, res) => {
  const cohort = req.body

  db('cohorts')
    .insert(cohort)
    .returning('id')
    .then(ids => res.status(201).json(ids))
    .catch(err => res.status(500).json({ message: 'Error' }))
})

router.get('/', (req, res) => {
  db('cohorts')
    .then(cohorts => res.status(200).json(cohorts))
    .catch(err => res.status(500).json({ message: 'Error' }))
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  db('cohorts')
    .where({ id })
    .then(cohort => res.status(200).json(cohort))
    .catch(err => res.status(500).json({ message: 'Error' }))
})

router.get('/:id/students', (req, res) => {
  const { id } = req.params

  db('students')
    .where({ id })
    .then(students => res.status(200).json(students))
    .catch(err => res.status(500).json({ message: 'Error' }))
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const changes = req.body

  db('cohorts')
    .where({ id })
    .update(changes)
    .then(count => res.status(200).json(count))
    .catch(err => res.status(500).json({ message: 'Error' }))
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  db('cohorts')
    .where({ id })
    .del()
    .then(count => res.status(200).json(count))
    .catch(err => res.status(500).json({ message: 'Error' }))
})

module.exports = router
