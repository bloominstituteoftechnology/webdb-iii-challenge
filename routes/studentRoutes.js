// NODE MODULES, EXPRESS ROUTER
// ==============================================
const express = require('express');
const studentDb = require('../data/helpers/studentDb.js');
const cohortDb = require('../data/helpers/cohortDb.js');

const router = express.Router();

// ROUTES
// ==============================================
router.get('/', async (_, res) => {
  try {
    const students = await studentDb.get();
    res.status(200).json(students);
  } catch {
    res.status(500).json({ error: 'There was an error retrieving all students!' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const student = await studentDb.get(req.params.id);
    student
      ? res.status(200).json(student)
      : res.status(404).json({ error: 'The student with the specified ID does not exist.' });
  } catch {
    res.status(500).json({ error: "There was an error retrieving the student's information!" });
  }
});

router.post('/', async (req, res) => {
  if (req.body.name && req.body.cohort_id) {
    const cohort = await cohortDb.get(req.body.cohort_id);
    if (cohort) {
      try {
        const addedStudent = await studentDb.insert(req.body);
        const student = await studentDb.get(addedStudent.id);
        res.status(201).json(student);
      } catch {
        res.status(500).json({ error: 'There was an error saving the student to the database.' });
      }
    } else res.status(404).json({ error: 'The cohort with the specified ID does not exist.' });
  } else res.status(400).json({ error: 'Please provide a name & cohort_id for the student.' });
});

module.exports = router;
