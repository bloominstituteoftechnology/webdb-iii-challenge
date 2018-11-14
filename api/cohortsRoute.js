const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile')
const db = knex(knexConfig.development)
const router = express.Router();


/* ----  GET ALL COHORTS  ---- */
router.get('/', (req, res) => {
  db('cohorts')
    .then(cohort => res.status(200).json(cohort))
    .catch(err => res.status(500).json(err))
})

/* ----  GET COHORTS BY ID  ---- */
router.get('/:id', (req, res) => {
  const { id } = req.params
  db('cohorts')
    .where({ id: id })
    .then(cohort => res.status(200).json(cohort))
    .catch(err => res.status(500).json(err))
})

/* ----  EDIT COHORT ---- */
router.put('/:id', (req, res) => {
  const { id } = req.params
  const changes = req.body
  db('cohorts')
    .where({ id: id })
    .update(changes)
    .then(count => res.status(201).json(count))
    .catch(err => res.status(500).json(err))
})

/* ----  DELETE COHORT ---- */
router.delete('/:id', (req, res) => {
  const { id } = req.params

  db('cohorts')
    .where({ id: id })
    .del()
    .then(count => res.status(201).json(count))
    .catch(err => res.status(500).json(err))
})

module.exports = router;