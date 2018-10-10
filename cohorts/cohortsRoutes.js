const express = require("express");

const cohorts = require("./cohortsModel.js");
const students = require("./cohortsModel.js");

const router = express.Router();

//=============== COHORT ENDPOINTS =============== //

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
      res.status(404).json({ message: "Cohort not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get students of a specific cohort
router.get("/:id/students", (req, res) => {
  students
    .findByCohort(req.params.id)
    .then(student => {
      if (student.length > 0) {
        res.json(student);
      } else
        res.status(404).json({
          message: "The student with the specified ID does not exist."
        });
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The student information could not be retrieved." })
    );
});

// Add a cohort
router.post("/", (req, res) => {
  const { name } = req.body;
  const cohort = { name };

  if (!name) {
    return res
      .status(400)
      .json({ error: "Please provide a name for your cohort." });
  }
  cohorts
    .add(cohort)
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// update a cohort
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  cohorts
    .update(id, changes)
    .then(cohort => {
      if (!cohort) {
        res.status(404).json({ message: "No cohort found to update" });
      } else {
        res.status(200).json(cohort);
      }
    })
    .catch(err => res.status(500).json(err));
});

// delete a cohort
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  cohorts
    .remove(id)
    .then(cohort => {
      if (!cohort) {
        res.status(404).json({ message: "No cohorts found to delete" });
      } else {
        res.status(200).json(cohort);
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
