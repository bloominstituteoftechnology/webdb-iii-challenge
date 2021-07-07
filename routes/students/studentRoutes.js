const express = require("express");
const knex = require("knex");

const dbConfig = require("../../knexfile");

const db = knex(dbConfig.development);

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  db("students")
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => res.status(500).json(err));
});

router.get("/:id", (req, res) => {
  db("students")
    .where({ id: req.params.id })
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => res.status(500).json(err));
});

router.post("/", (req, res) => {
  const student = req.body;
  if (!student) {
    res.status(400).json({ message: "Please provide a student name." });
  }
  db.insert(student)
    .into("students")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

router.delete("/:id", (req, res) => {
  db("students")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "No student with this ID was found." });
      }
    })
    .catch(err => res.status(500).json(err));
});

router.put("/:id", (req, res) => {
  const student = req.body;
  console.log(student);
  db("students")
    .where({ id: req.params.id })
    .update(student)
    .then(student => {
      if (student) {
        res.status(200).json({ message: "Update Completed" });
      } else {
        res.status(404).json({ message: "No student with this ID was found." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Update Failed!" });
    });
});

module.exports = router;
