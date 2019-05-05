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
    const cohorts = await db
      .select()
      .from("students")
      .orderBy("id", "desc");
    res.status(200).json(cohorts);
  } catch (err) {
    return errHelper(err, res);
  }
};
// - `[GET] /students` This route will return an array of all students.
server.get("/", (req, res) => {
  getAllStudents(req, res);
});
// - `[POST] /students` This route should save a new student to the database.
server.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const cohortId = await db
      .select()
      .from("cohorts")
      .where({ id });

    if (cohortId) {
      await db.insert({ name, cohort_id: id }).into("students");
      getAllStudents(req, res); //--> async as well
    } else {
      res.status(404).json({ message: "no cohort with that id exists" });
    }
  } catch (err) {
    return errHelper(err, res);
  }
});

// - `[PUT] /students/:id` This route will update the student with the matching `id` using information sent in the body of the request.
server.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updated = await db
      .update({ name })
      .from("students")
      .where({ id });

    if (updated) {
      getAllStudents(req, res);
    } else {
      res.status(404).json({ message: "students not found" });
    }
  } catch (err) {
    return errHelper(err, res);
  }
});

// - `[DELETE] /students/:id` This route should delete the specified student.
server.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await db
      .del()
      .from("students")
      .where({ id });

    if (deleted) {
      getAllStudents(req, res);
    } else {
      res.status(404).json({ message: "student with that id is not found" });
    }
  } catch (err) {
    return errHelper(err, res);
  }
});
// - `[GET] /students/:id` This route will return the student with the matching `id`.
// Have the student returned by the `[GET] /students/:id` endpoint include the cohort name and remove the `cohort_id` fields. The returned object should look like this:
server.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cohorts = await db
      .select("c.id", "s.name", "c.name as cohort")
      .from("cohorts as c")
      .join("students as s", "c.id", "s.cohort_id")
      .where("s.cohort_id", id)
      .first();

    if (cohorts) {
      res.status(200).json(cohorts);
    } else {
      res.status(404).json({ message: "student not found" });
    }
  } catch (err) {
    return errHelper(err, res);
  }
});
// ```js
// {
//   id: 1,
//   name: 'Lambda Student',
//   cohort: 'Full Stack Web Infinity'
// }
// ```

module.exports = server;
