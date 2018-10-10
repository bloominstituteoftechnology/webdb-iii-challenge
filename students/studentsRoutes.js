const express = require('express');

const students = require('./studentsModel.js');

const router = express.Router();

// get an array of all students
router.get('/', (req, res) => {
    students
        .find()
        .then(students => {
            res.status(200).json(students);
        })
        .catch(err => res.status(500).json(err));
});

// get a student by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const student = await students.findById(id);

        if (student) {
            res.status(200).json(student);
        } else {
            res.status(404).json({ message: 'Student with specified ID not found' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// add new student to database
router.post('/', (req, res) => {
    const student = req.body;

    students
        .add(student)
        .then(ids => {
            res.status(201).json(ids[0]);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// update student with matching id
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    students
      .update(id, changes)
      .then(count => {
        if (!count || count < 1) {
          res.status(404).json({ message: 'No student found to update' });
        } else {
          res.status(200).json(count);
        }
      })
      .catch(err => res.status(500).json(err));
  });

// delete student with matching id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    cohorts
      .remove(id)
      .then(count => {
        if (!count || count < 1) {
          res.status(404).json({ message: 'No cohort found to delete' });
        } else {
          res.status(200).json(count);
        }
      })
      .catch(err => res.status(500).json(err));
  });

  module.exports = router;