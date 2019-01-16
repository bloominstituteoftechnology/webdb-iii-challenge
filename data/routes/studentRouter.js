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
     .status(202)
     .json(student)
   })
   .catch(() => {
    res
     .status(500)
     .json({error: "There was an error fetching student from DB."})
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
    .json({message: "Student was successfully added to DB."})
  })
  .catch(() => {
   res 
   .status(500)
   .json({error: "There was an error adding student to DB."})
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
    .json({message: "Student was successfully altered in DB."})
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
    .json({message: "Student was successfully cleared from DB."})
  })
  .catch(() => {
   res
    .status(500)
    .json({error: "There was an error clearing student from DB."})
  })
})