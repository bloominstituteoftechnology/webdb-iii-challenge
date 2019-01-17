const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile.js');

const router = express.Router();

// connect to the database
const db = knex(knexConfig.development);


// add cohort
router.post('/', (req, res) => {

  const {name} = req.body;

  db('cohorts')
    .insert({name})
    .then(ids => {
      db('cohorts')
        .where({ id: ids[0] })
        .then(cohort => {
          res.status(201).json(cohort);
        });
    })
    .catch(err => res.status(500).json(err));
});

// list cohorts
router.get('/', (req, res) => {

  db('cohorts')
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => res.status(500).json(err));
});

// retive a cohort
router.get('/:id', (req, res) => {

  const {id} = req.params;

  db('cohorts')
    .where({id})
    .then(cohort => {
      if (cohort) {
        res.status(200).json(cohort);
      } else {
        res.status(404).json({ message: 'bear not found' });
      }
    })
    .catch(err => res.status(500).json(err));
});

// retrive students
// this one not finished
router.get('/students', (req, res) => {
  // need to add way to retrive students from cohort
  db('cohorts')
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => res.status(500).json(err));
});

// delete cohorts
router.delete('/:id', (req, res) => {
  const {id} = req.params;

  db('cohorts')
    .where({id})
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

// update cohorts
router.put('/:id', (req, res) => {
  const {id} = req.params;
  const {name} = req.body;

  db('cohorts')
    .where({id})
    .update({name})
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: 'cohort not found' });
      }
    })
    .catch(err => res.status(500).json(err));
});

exports.module = router;