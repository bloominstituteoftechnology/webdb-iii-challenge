const express = require("express");
const knex = require("knex");

const router = express.Router();

const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

router.get("/", (req, res) => {
  db("cohorts")
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  const cohortId = req.params.id;

  db("cohorts")
    .where("id", cohortId)
    .then(cohort => {
      if (cohort.length) {
        res.status(200).json(cohort);
      } else {
        res
          .status(404)
          .json({ message: `Could not find cohort with id ${cohortId}` });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Could not get any cohorts." });
    });
});

router.get('/:id/students', (req, res) => {
  const {id} = req.params;
  db('cohorts').where('id', id)
      .then(cohort => {
      if(Object.keys(cohort).length === 0){
          res.status(404).json({ message: "Invalid cohort ID" })
      } else {
          db('students').where('cohort_id', id)
              .then(students => {
                  if(Object.keys(students).length === 0){
                      res.status(404).json({ message: "This cohort doesn't have any students yet"})
                  } else {
                      res.json(students)
                  }
              })
              .catch(err => {res.status(500).json({ message: "Unable to fetch those students" })})
      }
  })
  .catch(err => res.status(500).json({ message: "Unable to fetch that specific cohort"}))
});

router.post("/", (req, res) => {
  const name = req.body;

  db.insert(name)
    .into("cohorts")
    .then(cohort => {
      res.status(201).json(cohort);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
