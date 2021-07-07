const express = require("express");

const cohorts = require("./cohortsModel.js");

const router = express.Router();

// get a list of cohorts
router.get("/", (req, res) => {
  cohorts
    .find()
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => res.status(500).json(err));
});

// get a cohort by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const cohort = await cohorts.findById(id);

    if (cohort) {
      res.status(200).json(cohort);
    } else {
      res.status(404).json({ message: "cohort not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// create cohorts
router.post("/", (req, res) => {
  const cohort = req.body;

  cohorts
    .add(cohort)
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// update cohorts
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  cohorts
    .update(id, changes)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: "No records found to update" });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
});

// delete cohorts
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  cohorts
    .remove(id)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: "No records found to delete" });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
