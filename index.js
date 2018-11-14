const express = require('express')
const server = express()
const knex = require('knex')

const knexConfig = require('./knexfile.js')
const db = knex(knexConfig.development)

server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).json({ api: 'ok' })
})

server.post('/api/cohorts/', (req, res) => {
  const cohort = req.body

  db('cohorts')
    .insert(cohort)
    .returning('id')
    .then(ids => res.status(201).json(ids))
    .catch(err => res.status(500).json({ message: 'Error' }))
})

server.get('/api/cohorts/', (req, res) => {
  db('cohorts')
    .then(cohorts => res.status(200).json(cohorts))
    .catch(err => res.status(500).json({ message: 'Error' }))
})

server.get('/api/cohorts/:id', (req, res) => {
  const { id } = req.params

  db('cohorts')
    .where({ id })
    .then(cohort => res.status(200).json(cohort))
    .catch(err => res.status(500).json({ message: 'Error' }))
})

server.get('/api/cohorts/:id/students', (req, res) => {
  const { id } = req.params

  db('students')
    .where({ id })
    .then(students => res.status(200).json(students))
    .catch(err => res.status(500).json({ message: 'Error' }))
})

server.put('/api/cohorts/:id', (req, res) => {
  const { id } = req.params
  const changes = req.body

  db('cohorts')
    .where({ id })
    .update(changes)
    .then(count => res.status(200).json(count))
    .catch(err => res.status(500).json({ message: 'Error' }))
})

server.delete('/api/cohorts/:id', (req, res) => {
  const { id } = req.params

  db('cohorts')
    .where({ id })
    .del()
    .then(count => res.status(200).json(count))
    .catch(err => res.status(500).json({ message: 'Error' }))
})

const port = 7000
server.listen(port, () => console.log(`\n--Server Running on port ${port}`))
