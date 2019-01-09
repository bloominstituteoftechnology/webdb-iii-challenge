const cohortDb = require("../data/helpers/cohortDb");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  cohortDb
    .get()
    .then(cohorts => {
      cohorts[0]
        ? res.json(cohorts)
        : res
            .status(400)
            .json({ error: "there are currently no cohorts in our directory" });
    })
    .catch(err => {
      res.status(500).json({ error: "could not retrieve cohorts" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  cohortDb
    .get(id)
    .then(cohort => {
      if (cohort[0]) {
        res.json(cohort);
      } else {
        res.status(404).json({ error: "cohort does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "cohort could not be retrieved." });
    });
});

router.get("/:id/students", (req, res) => {
  const { id } = req.params;
  cohortDb
    .getCohortStudents(id)
    .then(students => {
      cohortDb
        .get(id)
        .then(cohort =>
          cohort
            ? students[0]
              ? res.status(200).json(students)
              : res.status(500).json({ message: "cohort has no students" })
            : res.status(404).json({ error: "cohort does not exist" })
        );
    })
    .catch(err => {
      res.status(500).json({ error: "could not retrieve students in cohort" });
    });
});

module.exports = router;