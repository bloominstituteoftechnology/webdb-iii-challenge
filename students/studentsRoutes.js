const express = require("express");

const students = require("./studentsModel.js");

const router = express.Router();

//=============== STUDENT ENDPOINTS =============== //

// get a list of students
router.get("/", (req, res) => {
  students
    .find()
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
