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


module.exports = router;