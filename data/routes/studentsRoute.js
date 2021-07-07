const express = require('express')
const router = express.Router()

const knex = require('knex')
const dbConfig = require('../../knexfile')
const db = knex(dbConfig.development)

// endpoints
router.post('/', (req, res) => {
  const student = req.body;
  if(student.name && student.cohort_id) {
    db('students').insert(student)
      .then(id => {
        res
          .status(201)
          .json(id)
      })
      .catch(err => {
        res
          .status(500)
          .json({err: 'Failed to add student'})
      })
  } else {
    res
      .status(400)
      .json({err: 'Missing Student name or/and cohort id'})
  }
})

router.get('/', (req, res) => {
  db('students')
    .then(rows => {
      res.json(rows)
    })
    .catch(err => {
      res
        .status(500)
        .json({err: 'Failed to get students'})
    })
})

router.get('/:id', (req, res) => {
  const {id} = req.params;
  db('students').where('id', id)
    .then(row => {
      if(row.length !==0){
        res.json(row)
      } else {
        res
          .status(404)
          .json({err: 'No student under current id'})
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({err: 'Failed to get student'})
    })
})

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  db('students').where('id', id).del()
    .then(rowCount => {
      if(rowCount !== 0) {
        res.json(rowCount)
      } else {
        res
          .status(404)
          .json({err: 'No student under current id'})
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({err: 'Failed to delete student'})
    })
})

router.put('/:id', (req,res) => {
  const {id} = req.params;
  const student = req.body;
  if(student.name || student.cohort_id) {
    db('students').where('id', id).update(student)
    .then(rowCount => {
      if(rowCount !== 0) {
        res.json(rowCount)
      } else {
        res
          .status(404)
          .json({err: 'No student under current id'})
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({err: 'Failed to update student'})
    })
  } else {
    res
      .status(500)
      .json({err: 'name or/and cohort_id not provided'})
  }
})

module.exports = router;