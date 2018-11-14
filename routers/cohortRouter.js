const express = require('express');

const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

const router = express.Router();

router.post('/', (req, res) => {
    const cohort = req.body;
  
    db('cohorts')
      .insert(cohort)
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => {
        res.status(500).json({ message: 'Error creating cohort', err });
      });
  });
  
  router.get('/', (req, res) => {
    db('cohorts')
      .then(cohorts => res.status(200).json(cohorts))
      .catch(err => res.status(500).json({ message: 'could not get cohorts', err }));
  });
  
  router.get('/:id', (req, res) => {
    db('cohorts')
      .where({ id: req.params.id })
      .then(cohorts => res.status(200).json(cohorts))
      .catch(err => res.status(500).json({ message: 'could not get cohort', err }));
  });
  
  router.put('/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    
    db('cohorts')
      .where({ id })
      .update(changes)
      .then(count => {
        res.status(200).json({ count });
      })
      .catch(err => res.status(500).json({ message: 'could not update cohort', err }));
  });
  
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    db('cohorts')
      .where({ id })
      .del()
      .then(count => {
        res.status(200).json({ count });
      })
      .catch(err => res.status(500).json({ message: 'could not delete cohort', err }));
  });

  module.exports = router;