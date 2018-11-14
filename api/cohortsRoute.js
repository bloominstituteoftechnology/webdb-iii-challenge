const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile')
const db = knex(knexConfig.development)
const router = express.Router();


/* ----  GET ALL COHORTS  ---- */
router.get('/', (req, res) => {
  db('cohorts')
    .then(students => res.status(200).json(students))
    .catch(err => res.status(500).json(err))
})



module.exports = router;