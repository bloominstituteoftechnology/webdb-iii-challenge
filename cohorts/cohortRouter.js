const express = require("express");
const router = express.Router();
const knex = require("knex");
const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

// C O H O R T   R O U T I N G  //
// G E T   C O H O R T S
router.get("/", (req, res) => {
  db("cohorts")
    .then(cohorts => res.status(200).json(cohorts))
    .catch(err => res.status(500).json(err));
});

// G E T   B Y   I D
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("cohorts")
    .where({ id: id })
    .then(cohort => {
      res.status(200).json(cohort);
    })
    .catch(err => res.status(500).json(err));
});

// G E T   S T U D E N T S   B Y   C O H O R T   I D
router.get("/:id/students", (req, res) => {
  const { id } = req.params;

  db("students")
    .where({ cohort_id: id })

    .then(students => res.status(200).json(students));
});

// P O S T   C O H O R T
router.post("/", (req, res) => {
  const cohort = req.body;

  db("cohorts")
    .insert(cohort)
    .returning("id")
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// U P D A T E   C O H O R T
router.put("/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db("cohorts")
    .where({ id: id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

// D E L E T E   C O H O R T
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("cohorts")
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
