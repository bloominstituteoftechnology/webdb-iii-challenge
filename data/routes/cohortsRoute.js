const express = require('express')
const router = express.Router()

const knex = require('knex')
const dbConfig = require('../../knexfile')
const db = knex(dbConfig.development)

// endpoints
router.post('/', (req, res) => {
  const cohort = req.body;
  if(cohort.name) {
    db('cohorts').insert(cohort)
      .then(id => {
        res
          .status(201)
          .json(id)
      })
      .catch(err => {
        res
          .status(500)
          .json({err: 'Failed to add Cohort'})
      })
  } else {
    res
      .status(400)
      .json({err: 'Missing Cohort name'})
  }
})

router.get('/', (req, res) => {
  db('cohorts')
    .then(rows => {
      res.json(rows)
    })
    .catch(err => {
      res
        .status(500)
        .json({err: 'Failed to get Cohorts'})
    })
})

router.get('/:id', (req, res) => {
  const {id} = req.params;
  db('cohorts').where('id', id)
    .then(row => {
      if(row.length !==0){
        res.json(row)
      } else {
        res
          .status(404)
          .json({err: 'No cohort under current id'})
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({err: 'Failed to get Cohort'})
    })
})

router.get('/:id/students', (req, res) => {
  const {id} = req.params
  db('students').where('cohort_id', id)
    .then(rows => {
      if(rows.length !== 0) {
        res.json(rows)
      } else {
        res
          .status(404)
          .json({err: 'No students under current cohort id'})
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({err: 'Failed to get students'})
    })
})

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  db('cohorts').where('id', id).del()
    .then(rowCount => {
      if(rowCount !== 0) {
        res.json(rowCount)
      } else {
        res
          .status(404)
          .json({err: 'No cohort under current id'})
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({err: 'Failed to delete Cohort'})
    })
})

router.put('/:id', (req,res) => {
  const {id} = req.params;
  const cohort = req.body;
  if(cohort.name) {
    db('cohorts').where('id', id).update(cohort)
    .then(rowCount => {
      if(rowCount !== 0) {
        res.json(rowCount)
      } else {
        res
          .status(404)
          .json({err: 'No cohort under current id'})
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({err: 'Failed to update Cohort'})
    })
  } else {
    res
      .status(500)
      .json({err: 'No cohort name provided'})
  }
})

module.exports = router;