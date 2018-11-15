//imports
const express = require("express");
const knex = require("knex");

//define db using knex
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

//init router (Express class)
const router = express.Router();

// endpoints: all base URL "/" used as "/api/students/"
//POST new student
router.post("/", (req, res) => {
  const student = req.body;
  if (!student.name || !student.cohort_id) {
    res.status(400).json({
      message: "Please include a name and cohort ID for the new studentt."
    });
  } else {
    //first check that the submitted cohort_id belongs to a currently existing cohort
    db("cohorts")
      .where({ id: student.cohort_id })
      .then(cohort => {
        if (!cohort || !cohort.length) {
          res.status(404).json({
            message:
              "No cohort with that ID exists, please submit a different cohort ID for the new student."
          });
        } else {
          db("students")
            .insert(student)
            .then(id => res.status(201).json(id))
            .catch(err =>
              res
                .status(500)
                .json({ error: "An error occurred while saving this student." })
            );
        }
      })
      .catch(err =>
        res.status(500).json({
          error:
            "An error occurred while verifying the existence of a cohort with the submitted student's cohort_id."
        })
      );
  }
});

//GET list of all students
router.get("/", (req, res) => {
  db("students")
    .then(students => res.status(200).json(students))
    .catch(err =>
      res
        .status(500)
        .json({ error: "An occurred while retrieving the list of studentts." })
    );
});

//GET student by id (stretch: return only student's id, student's name, and the student's cohort's name)
router.get("/:id", (req, res) => {
  const studentId = req.params.id;
  db("students")
    // .join and .select methods in the next couple lines resolve the constraint of the stretch, otherwise will only student info from students table
    .join("cohorts", "students.cohort_id", "cohorts.id")
    //necessary to rename cohorts.name because the returned object can only have one 'name' field and it will take the last one
    .select("students.id", "students.name", "cohorts.name as cohort")
    .where("students.id", studentId)
    .then(student => {
      if (student) {
        res.status(200).json(student);
      } else {
        res
          .status(404)
          .json({ message: "The student with that ID doesn't exist." });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "An error occurred while retrieving that student." })
    );
});

//PUT updates onto an existing student
router.put("/:id", (req, res) => {
  const studentId = req.params.id;
  const changes = req.body;
  if (!changes.name || !changes.cohort_id) {
    res.status(400).json({
      message: "Please include a name and cohort ID for the updated studentt."
    });
  } else {
    //first check that the submitted cohort_id belongs to a currently existing cohort
    db("cohorts")
      .where({ id: changes.cohort_id })
      .then(cohort => {
        if (!cohort || !cohort.length) {
          res.status(404).json({
            message:
              "No cohort with that ID exists, please submit a different cohort ID for the updated student."
          });
        } else {
          db("students")
            .where({ id: studentId })
            .update(changes)
            .then(id => res.status(201).json(id))
            .catch(err =>
              res
                .status(500)
                .json({ error: "An error occurred while saving this student." })
            );
        }
      })
      .catch(err =>
        res.status(500).json({
          error:
            "An error occurred while verifying the existence of a cohort with the submitted student's cohort_id."
        })
      );
  }
});

//DELETE specified student
router.delete("/:id", (req, res) => {
  const studentId = req.params.id;

  db("students")
    .where({ id: studentId })
    .del()
    .then(count => {
      if (!count) {
        res.status(404).json({ message: "No student with that ID exists." });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err =>
      res.status(500).json({
        error: "An error occurred while attempting to delete this student."
      })
    );
});

module.exports = router;
