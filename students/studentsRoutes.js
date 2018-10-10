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

// Add a student
router.post("/", (req, res) => {
  const { name, cohort_id } = req.body;
  const student = { name, cohort_id };

  if (!name || !cohort_id) {
    return res.status(400).json({
      error: "Please provide a name and a cohort ID for your student."
    });
  }
  students
    .add(student)
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// update a student
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  students
    .update(id, changes)
    .then(student => {
      if (!student) {
        res.status(404).json({ message: "No student found to update" });
      } else {
        res.status(200).json(student);
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
