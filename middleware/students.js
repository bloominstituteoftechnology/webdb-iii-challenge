const express = require('express');
const router = express.Router();
const db = require('../helpers/studentHelpers');

router.post('/', (req, res) => {
  const student = req.body;
  if(student.name.length !== 0) {
    db.insert(student)
      .then(student => {
        res
          .status(201)
          .json(student.id)
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "There was a problem adding that student to the database...", error})
      })
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please give the student a name!" })
  }
})

router.get('/', (req, res) => {
  db.find()
    .then(students => {
      res
        .status(200)
        .json(students)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Sorry, we are having trouble fetching the list of students.", err })
    })
})

module.exports = router;