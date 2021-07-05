const express = require("express")
const router = express.Router()
const nodeDB = require('../knex-db/knex_studentDB')

 router.get('/', (req, res) => {
 nodeDB
  .pull()
  .then((students) => {
   res
    .status(202)
    .json(students)
  })
  .catch(() => {
   res
    .status(500)
    .json({error: "There was an error retrieving students."})
  })
})

 router.get('/:id', (req, res) => {
 const { id } = req.params
 if (id) {
  nodeDB
   .pullById(id)
   .then((student) => {
    res
     .status(202)
     .json(student)
   })
   .catch(() => {
    res
     .status(500)
     .json({error: "There was an error fetching student."})
   })
 }
})

 router.post('/', (req, res) => {
 const student = req.body
 nodeDB
  .place(student)
  .then((student) => {
   res
    .status(201)
    .json({message: "Student was successfully added."})
  })
  .catch(() => {
   res 
   .status(500)
   .json({error: "There was an error adding student."})
  })
})

 router.put('/:id', (req, res) => {
 const { id } = req.params
 const student = req.body
 nodeDB
  .alter(id, student)
  .then(() => {
   res
    .status(201)
    .json({message: "Student was successfully changed."})
  })
  .catch(() => {
   res
    .status(500)
    .json({error: ""})
  })
})

 router.delete('/:id', (req, res) => {
 const { id } = req.params
 nodeDB
  .clear(id)
  .then(() => {
   res
    .status(202)
    .json({message: "Student was successfully deleting."})
  })
  .catch(() => {
   res
    .status(500)
    .json({error: "There was an error deleting."})
  })
})

 module.exports = router 