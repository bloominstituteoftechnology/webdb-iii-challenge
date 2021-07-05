const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile')
const db = knex(knexConfig.development)
const router = express.Router();


/* ----  GET ALL STUDENTS  ---- */
router.get('/', (req, res) => {
  db('students')
    .then(students => res.status(200).json(students))
    .catch(err => res.status(500).json(err))
})

/* ----  GET STUDENTS BY ID  ---- */
router.get('/:id', (req, res) => {
  const { id } = req.params
  db('students')
    .where({ id: id })
    .then(student => res.status(200).json(student))
    .catch(err => res.status(500).json(err))
})

/* ----  EDIT STUDENT  ---- */
router.put('/:id', (req, res) => {
  const { id } = req.params
  const changes = req.body
  db('students')
    .where({ id: id })
    .update(changes)
    .then(count => res.status(201).json(count))
    .catch(err => res.status(500).json(err))
})

/* ----  NEW STUDENT  ---- */
router.post('/', (req, res) => {
  const newStudent = req.body

  db('students')

    .insert(newStudent)
    .then(count => res.status(201).json(count))
    .catch(err => res.status(500).json(err))
})

/* ----  DELETE STUDENT  ---- */
router.delete('/:id', (req, res) => {
  const { id } = req.params

  db('students')
    .where({ id: id })
    .del()
    .then(count => res.status(201).json(count))
    .catch(err => res.status(500).json(err))
})


module.exports = router;