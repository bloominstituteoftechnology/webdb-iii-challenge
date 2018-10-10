const express = require("express");
const cohortsDb = require("../data/models/cohortsDb");

const router = express.Router();

//Routes
router.post("/", (req, res) => {
  const newCohort = req.body;
  cohortsDb
    .insert(newCohort)
    .then(id => {
      if (id) {
        res.status(201).json({ message: "Cohort was added succesfully" });
      } else
        res.status(500).json({ error: "There was an error adding the record" });
    })
    .catch(err => res.status(500).json(err));
});

router.get("/", (req, res) => {
  cohortsDb
    .find()
    .then(cohorts => res.json(cohorts))
    .catch(err => res.json(err));
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ error: "There was an error with the request" });
  }

  cohortsDb
    .findById(id)
    .then(cohort => {
      if (!cohort || cohort === undefined) {
        res.status(404).json({ message: "Cohort was not found" });
      } else res.status(200).json(cohort);
    })
    .catch(err => res.status(500).json(err));
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updatedCohort = req.body;
  console.log(updatedCohort);
  if (!id || !updatedCohort) {
    res.status(400).json({ message: "Bad request" });
  }
  cohortsDb
    .update(id, updatedCohort)
    .then(count => {
      if (count && count > 0) {
        res.status(200).json({ message: "Cohort was updated" });
      } else
        res
          .status(500)
          .json({ message: "There was an error updating the cohort" });
    })
    .catch(err => res.status(500).json(err));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).json({ message: "Bad request" });
  }
  cohortsDb
    .remove(id)
    .then(count => {
      if (count && count > 0) {
        res.status(200).json({ message: "Cohort was removed" });
      } else
        res
          .status(500)
          .json({ message: "There was an error removing the cohort" });
    })
    .catch(err => json.stauts(500).json(err));
});

module.exports = router;
