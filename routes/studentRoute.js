const express = require("express");
const knex = require("knex");

const router = express.Router();

const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

// Student endpoints
router.get("/", (req, res) => {
  db("students")
    .select()
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  const studentId = req.params.id;

  db("students")
    .where("id", studentId)
    .select()
    .then(student => {
      if (student.length) {
        res.status(200).json(student);
      } else {
        res
          .status(404)
          .json({ message: `Could not find student with id ${studentId}` });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Could not get any students." });
    });
});

router.post("/", (req, res) => {
  const newStudent = req.body;

  db.insert(newStudent)
    .into("students")
    .then(student => {
      res.status(201).json(student);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  const updates = req.body;
  const { id } = req.params;

  db("students")
    .where("id", "=", id)
    .update(updates)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("students")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
