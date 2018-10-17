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