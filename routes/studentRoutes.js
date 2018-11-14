// NODE MODULES, EXPRESS ROUTER
// ==============================================
const express = require('express');
const studentDb = require('../data/helpers/studentDb.js');

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

module.exports = router;
