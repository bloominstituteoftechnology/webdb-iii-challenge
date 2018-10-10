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

module.exports = router;
