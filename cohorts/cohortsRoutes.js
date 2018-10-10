const express = require('express');

const cohorts = require('./cohortsModel.js');

const router = express.Router();

// get list of cohorts
router.get('/', (req, res) => {
    cohorts
      .find()
      .then(cohorts => {
        res.status(200).json(cohorts);
      })
      .catch(err => res.status(500).json(err));
  });

// get a cohort by id
router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const cohort = await cohorts.findById(id);
  
      if (cohort) {
        res.status(200).json(cohort);
      } else {
        res.status(404).json({ message: 'Cohort not found' });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });

// get list of all students in given cohort

// create a cohort

// update a cohort

// delete a cohort

module.exports = router;