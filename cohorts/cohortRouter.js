//imports
const express = require("express");
const knex = require("knex");

//define db using knex
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

//init router (Express class)
const router = express.Router();

// endpoints: all base URI "/" used as "/api/cohorts/"
//POST new cohort
router.post("/", (req, res) => {
  const cohort = req.body;
  if (!cohort.name) {
    res
      .status(400)
      .json({ message: "Please include a name for the new cohort." });
  } else {
    db("cohorts")
      .insert(cohort)
      .then(id => res.status(201).json(id))
      .catch(err =>
        res
          .status(500)
          .json({ error: "An error occurred while saving this cohort." })
      );
  }
});

//GET list of all cohorts
router.get("/", (req, res) => {
  db("cohorts")
    .then(cohorts => res.status(200).json(cohorts))
    .catch(err =>
      res
        .status(500)
        .json({ error: "An occurred while retrieving the list of cohorts." })
    );
});

//GET cohort by id
router.get("/:id", (req, res) => {
  const cohortId = req.params.id;
  db("cohorts")
    .where({ id: cohortId })
    .then(cohort => {
      if (cohort) {
        res.status(200).json(cohort);
      } else {
        res
          .status(404)
          .json({ message: "The cohort with that ID doesn't exist." });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "An error occurred while retrieving that cohort." })
    );
});

//GET list of specified cohort's students
router.get("/:id/students", (req, res) => {
  const cohortId = req.params.id;
  //first make sure cohort with that id exists
  db("cohorts")
    .where({ id: cohortId })
    .then(cohort => {
      if (!cohort) {
        //if it doesn't, 404
        res
          .status(404)
          .json({ message: "The cohort with that ID does not exist." });
      } else {
        //if it does, run GET request through student table
        db("students")
          .where({ cohort_id: cohortId })
          .then(students => {
            //check length of what is being returned instead of just students, since a cohort with no students will still return an empty array
            if (students.length) {
              res.status(200).json(students);
            } else {
              res.status(404).json({
                message:
                  "The cohort with that ID does not contain any students."
              });
            }
          })
          .catch(err =>
            res.status(500).json({
              error:
                "An error occurred while retrieving that cohort's students."
            })
          );
      }
    });
});

//PUT updates onto an existing cohort
router.put("/:id", (req, res) => {
  const cohortId = req.params.id;
  const changes = req.body;

  if (!changes.name) {
    res
      .status(400)
      .json({ message: "Please submit a name for the updated cohort." });
  } else {
    db("cohorts")
      .where({ id: cohortId })
      .update(changes)
      .then(count => {
        if (count) {
          res.status(200).json(count);
        } else {
          res.status(404).json({ message: "No cohort exists with that ID." });
        }
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: "An error occurred while updating the cohort." })
      );
  }
});

//DELETE specified cohort
router.delete("/:id", (req, res) => {
  const cohortId = req.params.id;

  db("cohorts")
    .where({ id: cohortId })
    .del()
    .then(count => {
      if (!count) {
        res.status(404).json({ message: "No cohort with that ID exists." });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err =>
      res.status(500).json({
        error: "An error occurred while attempting to delete this cohort."
      })
    );
});

module.exports = router;
