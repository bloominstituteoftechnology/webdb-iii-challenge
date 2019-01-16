const express = require("express")
const router = express.Router()
const nodeDB = require('../knex-db/knex_studentDB')

router.get('/', (req, res) => {
 nodeDB
  .pull()
  .then((students) => {
   res
    .json(students)
  })
  .catch(() => {
   res
    .status(500)
    .json({error: "There was an error retrieving students from DB."})
  })
})

router.get('/:id', (req, res) => {
 const { id } = req.params
 if (id) {
  nodeDB
   .pullById()
   .then((student) => {
    res
     .json(student)
   })
 }
})

router.post('/', (req, res) => {
 nodeDB
  .place()
  .then()
  .catch()
})

router.put('/:id', (req, res) => {
 nodeDB
  .alter()
  .then()
  .catch()
})

router.delete('/:id', (req, res) => {
 nodeDB
  .clear()
  .then()
  .catch()
})