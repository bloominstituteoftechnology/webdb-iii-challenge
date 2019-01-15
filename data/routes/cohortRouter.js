const express = require("express")
const router = express.Router()
const nodeDB = require("../knex-db/knexDB")

router.get('/', (req, res) => {
 nodeDB
  .pull()
  .then((cohorts) => {
   res
   .json(cohorts)
  })
  .catch(() => {
   res
    .status(500)
    .json({error: "There was an error pulling all cohorts from DB."})
  })
})

router.get('/:id', (req, res) => {
 const { id } = req.params
 nodeDB
 .pullById(id)
 .then((cohort) => {
  res
   .json(cohort)
 })
 .catch(() => {
  res
   .status(500)
   .json({error: "There was an error pulling specific cohort from DB."})
 })
})

router.post('/', (req, res) => {
 const cohort = req.body
 nodeDB
  .place(cohort)
  .then()
  .catch()
})

router.put('/', (req, res) => {
 nodeDB
  .alter()
  .then()
  .catch()
})

router.delete('/', (req, res) => {
 nodeDB
  .clear()
  .then()
  .catch()
})