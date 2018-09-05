const express = require("express");
const knex = require("knex");

const dbConfig = require("../../knexfile");

const db = knex(dbConfig.development);

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  db("cohorts")
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => res.status(500).json(err));
});

router.get("/:id", (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => res.status(500).json(err));
});

router.get("/:cohort_id/students", (req, res) => {
    db("students")
      .where({ cohort_id: req.params.cohort_id })
      .then(cohorts => {
        res.status(200).json(cohorts);
      })
      .catch(err => res.status(500).json(err));
  });

router.post("/", (req, res) => {
  const cohort = req.body;
  if (!cohorts) {
    res.status(400).json({ message: "Please provide a cohort name." });
  }
  db.insert(cohort)
    .into("cohorts")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

router.delete("/:id", (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "No cohort with this ID was found." });
      }
    })
    .catch(err => res.status(500).json(err));
});

router.put("/:id", (req, res) => {
  const cohort = req.body;
  console.log(cohort);
  db("cohorts")
    .where({ id: req.params.id })
    .update(cohort)
    .then(cohort => {
      if (cohort) {
        res.status(200).json({ message: "Update Completed" });
      } else {
        res.status(404).json({ message: "No cohort with this ID was found." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Update Failed!" });
    });
});

module.exports = router;
