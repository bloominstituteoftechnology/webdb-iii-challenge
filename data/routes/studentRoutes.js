const express = require("express");
const router = express.Router();
const knex = require("knex");
const knexConfig = require("../../knexfile");
const db = knex(knexConfig.development);

router.post("/", (req, res) => {
  const student = req.body;
  if (student.name && student.cohort_id) {
    db("students")
      .insert(student)
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: "Failed to insert the student into the database" });
      });
  } else {
    res
      .status(400)
      .json({ error: "Please provide a name and cohort id for the student" });
  }
});

router.get("/", (req, res) => {
  db("students")
    .then(students => {
      res.json(students);
    })
    .catch(() => {
      res.status(500).json({
        error:
          "Information for this table could not be retrieved from the database."
      });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("students")
    .where({ id })
    .then(students => {
      res.json(students);
    })
    .catch(() => {
      res
        .status(500)
        .json({
          error: "The student with that ID does not exist within the DB."
        });
    });
});

module.exports = router;
