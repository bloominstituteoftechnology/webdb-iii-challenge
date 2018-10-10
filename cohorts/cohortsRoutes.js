const express = require("express");

const cohorts = require("./cohortsModel.js");

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

module.exports = router;

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
