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

router.get('/:id/students', async (req, res) => {
  try {
    const students = await cohortDb.getCohortStudents(req.params.id);
    students > 0
      ? res.status(200).json(students)
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

router.delete('/:id', async (req, res) => {
  try {
    const count = await cohortDb.remove(req.params.id);
    count
      ? res.status(200).json({ message: 'Successfully deleted cohort.' })
      : res.status(404).json({ error: 'The cohort with the specified ID does not exist.' });
  } catch {
    res.status(500).json({ error: 'There was an error deleting the cohort in the database.' });
  }
});

router.put('/:id', async (req, res) => {
  if (req.body.name) {
    try {
      const count = await cohortDb.update(req.params.id, req.body);
      if (count) {
        const cohort = await cohortDb.get(req.params.id);
        res.status(200).json(cohort);
      } else res.status(404).json({ error: 'The cohort with the specified ID does not exist.' });
    } catch {
      res.status(500).json({ error: 'There was an error updating the cohort in the database.' });
    }
  } else res.status(400).json({ error: 'Please provide a name for the cohort.' });
});

module.exports = router;
