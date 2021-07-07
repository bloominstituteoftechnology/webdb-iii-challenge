const express = require("express");
const route = express.Router();
const db = require("../data/dbConfig");

route.get("/", async (req, res) => {
  const cohorts = await db("cohorts");

  try {
    res.json(cohorts);
  } catch (err) {
    res.json({ error: "Could not retrieve cohorts data." });
  }
});

route.get("/:id/students", async (req, res) => {
  const { id } = req.params;
  const students = await db("students").where({ cohort_id: id });

  try {
    const cohort = db("cohorts")
      .where({ id })
      .first();

    !cohort
      ? res
          .status(404)
          .json({ error: "The cohort with this id does not exist." })
      : res.json(students);
  } catch (err) {
    res.json({ error: "Unable to fetch the students for that cohort." });
  }
});

route.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cohort = await db("cohorts")
      .where({ id })
      .first();
    !cohort
      ? res
          .status(404)
          .json({ error: "The cohort with this id does not exist." })
      : res.json(cohort);
  } catch (err) {
    res.json({ error: "Unable to fetch the cohort with that id." });
  }
});

route.post("/", async (req, res) => {
  const cohort = req.body;

  try {
    await db("cohorts").insert(cohort);
    res.json({ message: "A new cohort has been created." });
  } catch (err) {
    res.json({ error: "Unable to add a new cohort." });
  }
});

route.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cohort = await db("cohorts")
      .where({ id })
      .first();
    !cohort
      ? res
          .status(404)
          .json({ error: "The cohort with this id does not exist." })
      : await db("cohorts")
          .where({ id })
          .del();

    res.json({ message: "The cohort has been deleted." });
  } catch (err) {
    res.json({ error: "Unable to delete the cohort." });
  }
});

route.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const cohort = await db("cohorts")
      .where({ id })
      .first();
    !cohort
      ? res
          .status(404)
          .json({ error: "The cohort with this id does not exist." })
      : await db("cohorts")
          .where({ id })
          .update(changes);

    res.json({ message: "The cohort has been updated." });
  } catch (err) {
    res.json({ error: "Unable to update the cohort." });
  }
});

module.exports = route;
