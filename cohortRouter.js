const express = require("express");
const knex = require("knex");

const knexConfig = require("./knexfile");

const db = knex(knexConfig.development);

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cohorts = await db("cohorts");
    if (cohorts) {
      res.status(200).json(cohorts);
    }
  } catch (error) {
    res.status(500).json({ message: `Cohorts could not be found ${error}.` });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cohort = await db("cohorts")
      .where({ id })
      .first();
    if (cohort) {
      res.status(200).json(cohort);
    } else {
      res
        .status(404)
        .json({ message: "Cohort with specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ message: `Cohort request failed ${error}.` });
  }
});

router.get("/:id/students", async (req, res) => {
  const { id } = req.params;
  try {
    const students = await db("students").where({ cohort_id: id });
    if (students.length >= 1) {
      res.status(200).json(students);
    } else {
      res
        .status(404)
        .json({
          message:
            "Cohort with specified ID either does not exist or has no students."
        });
    }
  } catch (error) {
    res.status(500).json({ message: `Cohort request failed ${error}.` });
  }
});

router.post("/", async (req, res) => {
  const cohort = req.body;
  if (!cohort.name) {
    res.status(400).json({ message: "Please enter a valid cohort name." });
  } else {
    try {
      const [id] = await db("cohorts").insert(cohort);
      if (id) {
        const newCohort = await db("cohorts")
          .where({ id })
          .first();
        res.status(201).json(newCohort);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: `Your cohort could not be posted ${error}.` });
    }
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cohort = await db("cohorts")
      .where({ id })
      .first();
    if (cohort) {
      const deleted = await db("cohorts")
        .where({ id })
        .del();
      if (deleted) {
        res.status(200).json(cohort);
      }
    } else {
      res
        .status(404)
        .json({ message: "The cohort with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({
      message: `The cohort's information could not be modified: ${error}.`
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const newCohort = req.body;

  if (!newCohort.name) {
    res.status(400).json({ message: "Please enter a valid cohort name." });
  } else {
    try {
      const editedCohort = await db("cohorts")
        .where({ id })
        .update(newCohort);
      if (editedCohort) {
        const cohort = await db("cohorts")
          .where({ id })
          .first();
        res.status(200).json(cohort);
      } else {
        res.status(404).json({
          message: "The cohort with the specified ID does not exist."
        });
      }
    } catch (error) {
      res.status(500).json({
        message: `The cohort's information could not be modified: ${error}.`
      });
    }
  }
});

module.exports = router;
