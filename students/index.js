const express = require("express");

//init && db
const db = require("../data/dbConfig");
const server = express.Router();

//helpers
const errHelper = (err, res) => {
  res.status(500).json({ message: ` internal err server ${err} ` });
};
const getAllStudents = async (req, res) => {
  try {
    const cohorts = await db.select().from("students");
    res.status(200).json(cohorts);
  } catch (err) {
    return errHelper(err, res);
  }
};

// - `[GET] /students` This route will return an array of all students.
server.get("/", (req, res) => {
  getAllStudents(req, res)
})
// - `[POST] /students` This route should save a new student to the database.
// - `[PUT] /students/:id` This route will update the student with the matching `id` using information sent in the body of the request.
// - `[DELETE] /students/:id` This route should delete the specified student.
// - `[GET] /students/:id` This route will return the student with the matching `id`.
// Have the student returned by the `[GET] /students/:id` endpoint include the cohort name and remove the `cohort_id` fields. The returned object should look like this:
// ```js
// {
//   id: 1,
//   name: 'Lambda Student',
//   cohort: 'Full Stack Web Infinity'
// }
// ```

module.exports = server;
