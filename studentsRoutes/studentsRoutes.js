const express = require('express')
const knex = require('knex')
const knexConfig = require('../knexfile.js')

const router = express.Router()
const db = knex(knexConfig.development)


router.route('/')
  .get((req, res) => {
    db('students')
      .then(students => res.status(200).json(students))
      .catch(err => res.status(500).json({ error: 'Could not retrieve any students.' }))
  })
  .post((req, res) => {
    const student = req.body
    db.insert(student)
      .into('students')
      .then(student => res.status(201).json(student))
      .catch(err => res.status(500).json({ error: 'The student could not be added.' }))
  })