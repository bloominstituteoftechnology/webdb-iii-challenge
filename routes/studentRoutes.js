const express = require("express");
// knex
const knex = require("knex");
const dbConfig = require("../knexfile");
const db = knex(dbConfig.development);

const router = express.Router();

// GET
router.get("/", (req, res) => {
  db("students")
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => {
      res.status(500).json({ error: "The students could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("students")
    .where({ id })
    .then(student => {
      if (student.length === 0) {
        res.status(404).json({
          message: "The student with the specified ID does not exist.",
        });
      } else {
        return res.status(200).json({ student });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The student could not be retrieved." });
    });
});

// start POST
router.post("/", (req, res) => {
  const student = req.body;
  if (!student.name || !student.cohort_id) {
    return res.status(406).json({
      errorMessage: "Please provide a name and cohort for the student.",
    });
  } else {
    db("students")
      .insert(student)
      .into("students")
      .then(students => {
        res.status(201).json({ message: "Student successfully added." });
      })
      .catch(err => {
        res.status(500).json({ error: "The student could not be added." });
      });
  }
});
// end POST

// start DELETE
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("students")
    .where({ id })
    .del()
    .then(students => {
      if (students === 0) {
        res.status(404).json({
          message: "The student with the specified ID does not exist.",
        });
      } else {
        res.status(200).json({ message: "Student removed successfully." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The student could not be removed." });
    });
});
// end DELETE

// start PUT
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const newName = req.body.name;
  if (!newName) {
    return res.status(406).json({
      errorMessage: "Please provide a name for the student.",
    });
  } else {
    db("students")
      .where({ id })
      .update({ name: newName })
      .then(students => {
        res.status(200).json({ message: "Student successfully modified." });
      })
      .catch(err => {
        res.status(500).json({ error: "The student could not be updated." });
      });
  }
});
// end PUT

module.exports = router;
