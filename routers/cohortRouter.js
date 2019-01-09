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

router.post("/", (req, res) => {
  const newCohort = req.body;
  if(!newCohort.name || newCohort.name === "") {
    res.status(400).json({error: "cohort name is required"});
  } else if (typeof newCohort.name !== "string") {
    releaseEvents.status(400).json({error: "cohort name must be a string"});
  } else {
    cohortDb
    .insert(newCohort)
    .then(id => res.status(201).json(id))
    .catch(err => res.status(500).json({error: "trouble adding cohort"}))
  }
});

router.put("/:id", (req, res) => {
  const updatedCohort = req.body;
  const { id } = req.params;
  cohortDb
    .get(id)
    .then(cohort => {
      if (cohort[0]) {
        if (!updatedCohort.name || updatedCohort.name === "") {
          res.status(400).json({ error: "cohort name is required" });
        } else if (typeof updatedCohort.name !== "string") {
          res.status(400).json({ error: "cohort name must be a string" });
        } else {
          cohortDb
            .update(id, updatedCohort)
            .then(rows => {
              cohortDb
                .get(id)
                .then(cohort => res.status(201).json(cohort))
                .catch(err =>
                  res
                    .status(500)
                    .json({ error: "trouble retrieving updated cohort" })
                );
            })
            .catch(err =>
              res.status(500).json({ error: "trouble updating cohort" })
            );
        }
      } else {
        res.status(404).json({ error: "cohort does not exist" });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "trouble retrieving cohort to update" })
    );
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await cohortDb.get(id);

  cohortDb
    .get(id)
    .then(cohort => {
      if (cohort[0]) {
        cohortDb
          .remove(id)
          .then(rows => res.status(201).json(deleted))
          .catch(err =>
            res.status(500).json({ error: "trouble deleting cohort" })
          );
      } else {
        res.status(404).json({ error: "cohort does not exist" });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "trouble retrieving cohort to be deleted" })
    );
});

module.exports = router;