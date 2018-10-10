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
router.get('/:id/students', async (req, res) => {
    try {
        const { id } = req.params;
    } catch (error) {
        res.status(500).json(error);
    }
});

// create a cohort
router.post('/', (req, res) => {
    const cohort = req.body;
  
    cohorts
      .add(cohort)
      .then(ids => {
        res.status(201).json(ids[0]);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

// update a cohort
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    cohorts
      .update(id, changes)
      .then(count => {
        if (!count || count < 1) {
          res.status(404).json({ message: 'No cohort found to update' });
        } else {
          res.status(200).json(count);
        }
      })
      .catch(err => res.status(500).json(err));
  });

// delete a cohort
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