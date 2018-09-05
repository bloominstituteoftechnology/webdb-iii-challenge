const express = require("express");
const cohortsRouter = express.Router();

const cohortDB = require("../db/dbConfig");

//middleware below
const bodyChecker = require("../middleware/bodyChecker");
//middleware above

cohortsRouter.get("/", (req, res) => {
  cohortDB("cohorts")
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
cohortsRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  cohortDB("cohorts")
    .where({ id })
    .then(cohort => {
      res.status(200).json(cohort);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

cohortsRouter.get("/:id/students", (req, res) => {
  const { id } = req.params;
  cohortDB("students")
    .where({ cohort_id: id })
    .then(students => {
      res.status(200).json(students);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

cohortsRouter.post("/", bodyChecker, (req, res) => {
  cohortDB("cohorts")
    .insert(req.body)
    .then(cohortId => {
      res.status(201).json(cohortId);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

cohortsRouter.put("/:id", bodyChecker, (req, res) => {
  const { id } = req.params;
  cohortDB("cohorts")
    .update(req.body)
    .where({ id })
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json(count);
    });
});

cohortsRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  cohortDB("cohorts")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json(count);
    });
});

module.exports = cohortsRouter;

//"select * - SQLITE_ERROR: no tables specified"
