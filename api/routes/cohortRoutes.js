const express = require("express");
const cohortDb = require("../../data/helpers/cohortDb.js");
const router = express.Router();

router.get("/", (req, res) => {
  cohortDb
    .get()
    .then(cohorts => {
      res.json(cohorts);
    })
    .catch(err => res.send({ error: "The cohorts could not be retrieved." }));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  cohortDb
    .get(id)
    .then(cohort => {
      if (cohort) {
        res.status(200).json(cohort);
      } else {
        res.status(404).json({
          message: "The cohort with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({ error: "The cohort couldn't be retrieved" });
    });
});

router.get("/:id/students", (req, res) => {
  const { id } = req.params;
  cohortDb
    .getStudentList(id)
    .then(cohort => {
      if (cohort) {
        res.status(200).json(cohort);
      } else {
        res.status(404).json({
          message: "The cohort with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({ error: "The student list couldn't be retrieved" });
    });
});

router.post("/", async (req, res) => {
  if (!req.body.name || !req.body.cohort_id) {
    return res
      .status(400)
      .json({ message: "Please provide name and cohort id for cohort." });
  }
  try {
    let data = await cohortDb.insert(req.body);
    return res.status(201).json({
      id: data.id,
      name: req.body.name,
      cohort_id: req.body.cohort_id
    });
  } catch (err) {
    res.status(500).json({
      error: "There was an error while saving the cohort to the database"
    });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  cohortDb.get(id).then(cohort => {
    if (!cohort) {
      res
        .status(404)
        .json({ message: "The cohort with the specified ID does not exist." });
    } else {
      cohortDb
        .remove(id)
        .then(cohort => {
          res.status(200).json({ message: `cohort was successfully deleted` });
        })
        .catch(err => {
          console.log("Error: ", err);
          res.status(500).json({ error: "The cohort could not be removed" });
        });
    }
  });
});

//updates the cohort and returns the updated cohort object
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, cohort_id } = req.body;
  const cohort = { name, cohort_id };

  if (!req.body.name || !req.body.cohort_id) {
    return res
      .status(400)
      .json({ message: "Please provide name and cohort id for cohort." });
  } else {
    cohortDb.get(id).then(cohort => {
      if (!cohort) {
        return res.status(404).json({
          message: "The cohort with the specified ID does not exist."
        });
      }
    });
  }

  cohortDb
    .update(id, cohort)
    .then(res.status(200))
    .catch(err => {
      console.log("Error: ", err);
      res
        .status(500)
        .json({ error: "The cohort information could not be modified." });
    });

  cohortDb.get(id).then(cohort => {
    if (cohort) {
      res.status(200).json(cohort);
    }
  });
});

module.exports = router;
