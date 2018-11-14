// NODE MODULES, EXPRESS ROUTER
// ==============================================
const express = require('express');
const cohortDb = require('../data/helpers/cohortDb.js');

const router = express.Router();

// ROUTES
// ==============================================
router.get('/', async (_, res) => {
  try {
    const cohorts = await cohortDb.get();
    res.status(200).json(cohorts);
  } catch {
    res.status(500).json({ error: 'There was an error retrieving all cohorts!' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cohort = await cohortDb.get(req.params.id);
    cohort
      ? res.status(200).json(cohort)
      : res.status(404).json({ error: 'The cohort with the specified ID does not exist.' });
  } catch {
    res.status(500).json({ error: "There was an error retrieving the cohort's information!" });
  }
});

router.post('/', async (req, res) => {
  if (req.body.name) {
    try {
      const addedCohort = await cohortDb.insert(req.body);
      const cohort = await cohortDb.get(addedCohort.id);
      res.status(201).json(cohort);
    } catch {
      res.status(500).json({ error: 'There was an error saving the cohort to the database.' });
    }
  } else res.status(400).json({ error: 'Please provide a name for the cohort.' });
});

module.exports = router;
