const express = require("express");

const students = require("./studentsModel.js");

const router = express.Router();

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
      res.status(404).json({ message: "student not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// create students
router.post("/", (req, res) => {
  const student = req.body;

  students
    .add(student)
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// update students
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  students
    .update(id, changes)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: "No records found to update" });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
});

// delete students
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  student
    .remove(id)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: "No records found to delete" });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
