// imports
const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

// Sets up the route
const router = express.Router();

// Routes
// GETS all the cohorts
router.get('/', (req, res) => {
  db('cohorts')
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: 'There was an error getting the cohorts.', error });
    });
});

// GETS specific cohort
router.get('/:id', (req, res) => {
  const id = req.params.id;

  db('cohorts')
    .where({ id })
    .then(cohort => {
      res.status(200).json(cohort);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: 'There was an error getting the cohort.', error });
    });
});

// POST adds a cohort
router.post('/', (req, res) => {
  const newCohort = req.body;
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: 'Missing information.' });
  }
  db('cohorts')
    .insert(newCohort)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: 'There was an error adding the new cohort.', error });
    });
});

// DELETE deletes a cohort
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  db('cohorts')
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(error => {
      res.status(500).json({
        message: 'There has been an error deleting the cohort.',
        error
      });
    });
});

// PUT updates a cohort
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const update = req.body;

  db('cohorts')
    .where({ id })
    .update(update)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: 'There was an error updating the cohort.', error });
    });
});

module.exports = router;
