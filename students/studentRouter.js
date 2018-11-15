const express = require("express");
const router = express.Router();
const knex = require("knex");
const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

// S T U D E N T   R O U T I N G  //
// G E T   S T U D E N T S
router.get("/", (req, res) => {
  db("students")
    .then(students => res.status(200).json(students))
    .catch(err => res.status(500).json(err));
});

// G E T  S T U D E N T S  B Y  I D
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("students")
    .where({ id: id })
    .then(student => {
      res.status(200).json({
        id: student[0].id,
        name: student[0].name,
        cohort_id: student[0].cohort_id
      });
    })
    .catch(err => res.status(500).json(err));
});

// P O S T   S T U D E N T
router.post("/", (req, res) => {
  const student = req.body;

  db("students")
    .insert(student)
    .returning("id")
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// E D I T   S T U D E N T
router.put("/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db("students")
    .where({ id: id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

// D E L E T E  S T U D E N T
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("students")
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
