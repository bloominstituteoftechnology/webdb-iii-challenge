const express = require('express');

const cohortDB = require('../helpers/cohortsModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  cohortDB.find()
    .then(cohorts => {
      res.status(200).json(cohorts)
    }).catch( err => {
      res.status(400).json({message: "unable to get the cohorts"})
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params;

  cohortDB.findById(id)
    .then( cohort => {
      res.status(200).json(cohort)
    }).catch( err => {
      res.status(500).json({message: "unable to get cohort"})
    })
})

router.get('/:id/students', (req, res) => {
  const { id } = req.params;

  cohortDB.findByStudentsbyCohortId(id)
    .then( students => {
      res.status(200).json(students)
    }).catch( err => {
      res.status(500).json({message: "unable to get students"})
    })
})

router.post('/', (req, res) => {
  const newCohort = req.body;

  cohortDB.insert(newCohort)
    .then( row => {
      res.status(201).json({message: `successfully created id ${row}`})
    }).catch( err => {
      res.status(500).json({message: "unable to create a new cohort"})
    })
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const change = req.body;

  cohortDB.update(id, change)
    .then( rows => {
      res.status(201).json({message: `updated ${rows} row(s)`})
    }).catch( err => {
      res.status(500).json({message: "unable to update the cohort"})
    })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  cohortDB.remove(id)
    .then( rows => {
      res.status(201).json({message: `successfully deleted ${rows} row(s)`})
    }).catch( err => {
      res.status(500).json({message: "unable to delete row(s"})
    })
})


module.exports = router