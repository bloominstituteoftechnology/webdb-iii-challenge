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
// `[GET] /api/cohorts`
// This route will return an array of all cohorts.
server.get("/", (req, res) => {
  getAllCohorts(req, res);
});
// `[POST] /api/cohorts`
//This route should save a new cohort to the database.
server.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "all fields are required" });
  }

  try {
    const [posted] = await db.insert({ name }).into("cohorts");
    if (posted) {
      getAllCohorts(req, res);
    } else {
      res.status(404).json({ message: "cohort not found" });
    }
  } catch (err) {
    return errHelper(err, res);
  }
});
// `[GET] /api/cohorts/:id`
//This route will return the cohort with the matching `id`.
server.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cohort = await db
      .select()
      .from("cohorts")
      .where({ id })
      .first();
    console.log(cohort);
    if (cohort) {
      res.status(200).json(cohort);
    } else {
      res.status(404).json({ message: "cohort with that id is not found " });
    }
  } catch (err) {
    return errHelper(err, res);
  }
});
// `[GET] /api/cohorts/:id/students`
// returns all students for the cohort with the specified `id`.
server.get("/:id/students", async (req, res) => {
  const { id } = req.params;

  try {
    const cohort = await db
      .select("s.*")
      .from("cohorts as c")
      .join("students as s", "c.id", "s.cohort_id")
      .where("s.cohort_id", id);
    if (cohort) {
      res.status(200).json(cohort);
    } else {
      res
        .status(404)
        .json({ message: "student with that cohort _ id is not found" });
    }
  } catch (err) {
    return errHelper(err, res);
  }
});

// `[PUT] /api/cohorts/:id`
//This route will update the cohort with the matching `id` using information sent in the body of the request.
server.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "all fields are required" });
  }

  try {
    const updated = await db
      .update({ name })
      .from("cohorts")
      .where({ id });
    if (updated) {
      getAllCohorts(req, res);
    } else {
      res.status(404).json({ message: "cohort not found" });
    }
  } catch (err) {
    return errHelper(err, res);
  }
});
// `[DELETE] /api/cohorts/:id`
// This route should delete the specified cohort.
server.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await db
      .del()
      .from("cohorts")
      .where({ id });

    if (deleted) {
      getAllCohorts(req, res);
    } else {
      res.status(404).json({ message: "id not found" });
    }
  } catch (err) {
    return errHelper(err, res);
  }
});

module.exports = server;
