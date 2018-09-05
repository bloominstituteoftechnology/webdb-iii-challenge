const express = require('express')
const cohortsRouter = express.Router()

const cohortDB = require('../db/dbConfig');

cohortsRouter.get('/', (err, req, res, next) => {
  cohortDB()
    .then(cohorts => {
      res.status(200).json(cohorts)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})


module.exports = cohortsRouter; 

