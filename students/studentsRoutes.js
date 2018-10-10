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

// get a student by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const student = await students.findById(id);

    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
