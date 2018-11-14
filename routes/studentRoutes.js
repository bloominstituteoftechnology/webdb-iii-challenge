// imports
const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

// Sets up the route
const router = express.Router();

// Routes
// GET gets all the students
router.get('/', (req, res) => {
  db('students')
    .then(students => {
      res.status(200).json(students);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: 'There was an error getting the students', error });
    });
});
// GET gets specific student
router.get('/:id', (req, res) => {
  const id = req.params.id;

  db('students')
    .where({ id })
    .then(student => {
      res.status(200).json(student);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: 'There was an error getting the student.', error });
    });
});
// POST adds a new student
router.post('/', (req, res) => {
  const newStudent = req.body;
  const { cohort_id, name } = req.body;
  if (!name || !cohort_id) {
    res.status(400).json({ message: 'Missing information.' });
  }
  db('students')
    .insert(newStudent)
    .then(ids => {
      res.status(200).json(ids);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: 'There was an error adding the students.', error });
    });
});
// DELETE removes a student
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  db('students')
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: 'There was an error removing the student.', error });
    });
});
// PUT updates a student
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const update = req.body;

  db('students')
    .where({ id })
    .update(update)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: 'There was an error updating the student', error });
    });
});

module.exports = router;
