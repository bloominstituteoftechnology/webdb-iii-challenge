const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);
const router = express.Router();

// gets all cohorts

router.get('/', (req, res) => {
  db('cohorts')
    .then(cohorts => res.status(200).json(cohorts))
    .catch( error => res.status(500).json({message: 'an error occured while retrieving data', error}))
})

//gets cohort by id
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db('cohorts')
    .where({id: id})
    .then( cohort => res.status(200).json(cohort))
  .catch(error => res.status(500).json({message: 'an error occured while retrieving data', error}))
  
})

//adds a new cohort

router.post('/', (req, res) => {
  const cohort = req.body;
  db('cohorts')
  .insert(cohort)
  .returning('id')
  .then( ids => {
    res.status(201).json(ids)
  })
  .catch( error => {
    res.status(500).json({ message: 'Error inserting zoo', error})
  })
})

//updates the cohort
router.put('/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('cohorts')
    .where({ id: id})
    .update(changes)
    .then(count => {
      res.status(201).json(count)
    })
    .catch( error => {
      res.status(500).json({ message: 'error updating zoo', error })
    })
})

// deletes cohort

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('cohorts')
    .where({ id: id})
    .del()
    .then(count => {
      res.status(201).json(count)
    })
    .catch( error => {
      res.status(500).json({message: 'error deleting zoo', error})
    })

})

module.exports = router;




// - `[GET] /api/cohorts/:id/students` returns all students for the cohort with the specified `id`.

