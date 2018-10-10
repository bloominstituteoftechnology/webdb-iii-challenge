const express = require("express");
const router = express.Router();
const knex = require("knex");

const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

// endpoint routes

// create cohort

router.post("/", (req, res) => {
  const cohort = req.body;

  // Requre Name
  if (!req.body.name) {
    return res.status(400).json({ msg: "you must provide a name" });
  }

  // perform insert
  db.insert(cohort)
    .into("cohorts")
    .then(newCohorts => {
      res.status(201).json(newCohorts);
    })
    .catch(err => res.status(500).json(err));
});
