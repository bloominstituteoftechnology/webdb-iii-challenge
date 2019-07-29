const express = require("express");
const router = express.Router();
const knex = require("knex");

const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

// [POST] '/api/cohorts'
// This route should save a new cohort to the database.
router.post("/", (req, res) => {
  const cohort = req.body;
  db("cohorts")
    .insert(cohort)
    .then(id => res.status(201).json(id))
    .catch(err => res.status(500).json(err));
});

// [GET] '/api/cohorts'
// This route will return an array of all cohorts.
router.get("/", (req, res) => {
  db("cohorts")
    .then(cohorts => res.status(200).json(cohorts))
    .catch(err => res.status(500).json(err));
});

// [GET] '/api/cohorts/:id'
// This route will return the cohort with the matching `id`.
router.get("/:id", (req, res) => {
  const {id} = req.params;
  db("cohorts")
    .where({id})
    .then(cohort => {
      cohort.length > 0
        ? res.status(200).json(cohort)
        : res.status(404).json({error: "cohort not found"});
    })
    .catch(err => res.status(500).json(err));
});

// [GET] '/api/cohorts/:id/students'
// returns all students for the cohort with the specified `id`.
router.get("/:id/students", (req, res) => {
  const {id} = req.params;
  db("cohorts as c")
    .join("students as s", "s.cohort_id", "=", "c.id")
    .where("c.id", id)
    .then(students => res.status(200).json(students))
    .catch(err => res.status(500).json(err));
});

// [PUT] '/api/cohorts/:id'
// This route will update the cohort with the matching `id` using information sent in the body of the request.
router.put("/:id", (req, res) => {
  const {id} = req.params;
  const change = req.body;
  db("cohorts")
    .where({id})
    .update(change)
    .then(count => res.status(201).json({success: `${count} cohort updated`}))
    .catch(err => res.status(500).json(err));
});

// [DELETE] '/api/cohorts/:id'
// This route should delete the specified cohort.
// router.delete('/api/cohorts/:id')
router.delete("/:id", (req, res) => {
  const {id} = req.params;
  db("cohorts")
    .where({id})
    .del()
    .then(count => res.status(200).json({success: `${count} cohort deleted`}))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
