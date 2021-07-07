const express = require("express");
// knex
const knex = require("knex");
const dbConfig = require("../knexfile");
const db = knex(dbConfig.development);

const router = express.Router();

// GET
router.get("/", (req, res) => {
  db("cohorts")
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => {
      res.status(500).json({ error: "The cohorts could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("cohorts")
    .where({ id })
    .then(cohort => {
      if (cohort.length === 0) {
        res.status(404).json({
          message: "The cohort with the specified ID does not exist.",
        });
      } else {
        return res.status(200).json({ cohort });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The cohort could not be retrieved." });
    });
});

// last get working when you pass name of class as id
// instead of id (id range keeps changing)
router.get("/:id/students", (req, res) => {
  const { id } = req.params;
  db("students")
    .where("cohort_id", id)
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => {
      res.status(500).json({ error: "The students could not be retrieved." });
    });
});
// end get

// start POST
router.post("/", (req, res) => {
  const cohort = req.body;
  if (!cohort.name) {
    return res.status(406).json({
      errorMessage: "Please provide a name for the cohort.",
    });
  } else {
    db("cohorts")
      .insert(cohort)
      .into("cohorts")
      .then(cohorts => {
        res.status(201).json({ message: "Cohort successfully added." });
      })
      .catch(err => {
        res.status(500).json({ error: "The cohort could not be added." });
      });
  }
});
// end POST

// start DELETE
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("cohorts")
    .where({ id })
    .del()
    .then(cohorts => {
      if (cohorts === 0) {
        res.status(404).json({
          message: "The cohort with the specified ID does not exist.",
        });
      } else {
        res.status(200).json({ message: "Cohort removed successfully." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The cohort could not be removed." });
    });
});
// end DELETE

// start PUT
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const newName = req.body.name;
  if (!newName) {
    return res.status(406).json({
      errorMessage: "Please provide a name for the cohort.",
    });
  } else {
    db("cohorts")
      .where({ id })
      .update({ name: newName })
      .then(cohorts => {
        res.status(200).json({ message: "Cohort successfully modified." });
      })
      .catch(err => {
        res.status(500).json({ error: "The cohort could not be updated." });
      });
  }
});
// end PUT

module.exports = router;
