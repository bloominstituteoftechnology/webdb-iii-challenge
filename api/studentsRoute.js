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



module.exports = router;