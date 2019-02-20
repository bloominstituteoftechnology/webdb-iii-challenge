const express = require("express");

//init && db
const db = require("../data/dbConfig");
const server = express.Router();

//helpers
const errHelper = (err, res) => {
  res.status(500).json({ message: ` internal err server ${err} ` });
};
const getAllCohorts = async (req, res) => {
  try {
    const cohorts = await db.select().from("cohorts");
    res.status(200).json(cohorts);
  } catch (err) {
    return errHelper(err, res);
  }
};
// `[GET] /api/cohorts` This route will return an array of all cohorts.
server.get("/", (req, res) => {
  getAllCohorts(req, res);
});
// `[POST] /api/cohorts` This route should save a new cohort to the database.

// `[GET] /api/cohorts/:id` This route will return the cohort with the matching `id`.
// `[GET] /api/cohorts/:id/students` returns all students for the cohort with the specified `id`.
// `[PUT] /api/cohorts/:id` This route will update the cohort with the matching `id` using information sent in the body of the request.
// `[DELETE] /api/cohorts/:id` This route should delete the specified cohort.

module.exports = server;
