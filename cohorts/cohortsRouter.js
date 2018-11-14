const express = require("express");
const knex = require("knex");

const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);
const router = express.Router();

router.post("/", (req, res) => {
  db.insert(req.body)
    .into("cohorts")
    .then(ids => res.send(201).json(ids))
    .catch(err => res.send(500).json(err));
});

router.get("/", (req, res) => {
  db("cohorts")
    .then(cohorts => res.status(200).json(cohorts))
    .catch(err => res.status(500).json(err));
});

router.get("/:id", (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .then(cohort => res.status(200).json(cohort))
    .catch(err => res.status(500).json(err));
});

router.get("/:id/students", (req, res) => {
  db("students")
    .where({ cohort_id: req.params.id })
    .then(students => res.status(200).json(students))
    .catch(err => res.status(500).json(err));
});

router.put("/:id", (req, res) => {
  db("cohorts")
    .where("id", "=", req.params.id)
    .update(req.body)
    .then(count => res.status(200).json(count))
    .catch(err => res.status(500).json(err));
});

router.delete("/:id", (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .del()
    .then(count => res.status(200).json(count))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
