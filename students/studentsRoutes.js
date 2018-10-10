const express = require('express');

const students = require('./studentsModel');

const router = express.Router();

router.get('/', (req, res) => {
  students
    .find()
    .then((students) => {
      res.status(200).json(students);
    })
    .catch((err) => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  students
    .findById(id)
    .then((student) => {
      if (!student) {
        return res.status(404).json({
          message: `Student with id ${id} could not be found.`,
        });
      }
      res.status(200).json(student);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get('/:id/students', (req, res) => {
  const { id } = req.params;
  students
    .findById(id)
    .then((student) => {
      if (!student) {
        return res.status(404).json({
          message: `student with id ${id} could not be found.`,
        });
      }
      students.findStudents(id).then((students) => {
        console.log('students', students.length, student);
        if (students.length === 0) {
          return res.status(404).json({
            message: `No students found for ${student.name}.`,
          });
        }
        res.status(200).json(students);
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  const { name, cohort_id } = req.body;
  const student = { name, cohort_id };
  if (!name || !cohort_id) {
    return res.status(400).send({
      errorMessage: 'Please provide a name and cohort id for the student.',
    });
  }
  students
    .add(student)
    .then((ids) => {
      res.status(201).json(ids);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, cohort_id } = req.body;
  const newStudent = { name, cohort_id };
  if (!name || !cohort_id) {
    return res.status(400).send({
      errorMessage: 'Please provide a name and cohort id for the student.',
    });
  }
  students.update(id, newStudent).then((count) => {
    if (!count) {
      return res.status(404).json({
        message: 'No student found to update',
      });
    }
    res.status(200).json({ message: `${count} record updated` });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  students
    .remove(id)
    .then((remove) => {
      if (!remove) {
        return res.status(404).send({
          message: `The student with the specified ID ${id} does not exist.`,
        });
      }
      res.status(200).send({ message: `student with ID ${id} was removed.` });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
