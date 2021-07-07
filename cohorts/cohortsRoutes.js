const express = require('express');

const cohorts = require('./cohortsModel');

const router = express.Router();

router.get('/', (req, res) => {
  cohorts
    .find()
    .then((cohorts) => {
      res.status(200).json(cohorts);
    })
    .catch((err) => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  cohorts
    .findById(id)
    .then((cohort) => {
      if (!cohort) {
        return res.status(404).json({
          message: `Cohort with id ${id} could not be found.`,
        });
      }
      res.status(200).json(cohort);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get('/:id/students', (req, res) => {
  const { id } = req.params;
  cohorts
    .findById(id)
    .then((cohort) => {
      if (!cohort) {
        return res.status(404).json({
          message: `Cohort with id ${id} could not be found.`,
        });
      }
      cohorts.findStudents(id).then((students) => {
        console.log('students', students.length, cohort);
        if (students.length === 0) {
          return res.status(404).json({
            message: `No students found for ${cohort.name}.`,
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
  const { name } = req.body;
  const cohort = { name };
  if (!name) {
    return res.status(400).send({
      errorMessage: 'Please provide a name for the cohort.',
    });
  }
  cohorts
    .add(cohort)
    .then((ids) => {
      res.status(201).json(ids);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const newCohort = { name };
  if (!name) {
    return res.status(400).send({
      errorMessage: 'Please provide a name for the cohort.',
    });
  }
  cohorts.update(id, newCohort).then((count) => {
    if (!count) {
      return res.status(404).json({
        message: 'No cohort found to update',
      });
    }
    res.status(200).json({ message: `${count} record updated` });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  cohorts
    .remove(id)
    .then((remove) => {
      if (!remove) {
        return res.status(404).send({
          message: `The cohort with the specified ID ${id} does not exist.`,
        });
      }
      res.status(200).send({ message: `cohort with ID ${id} was removed.` });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
