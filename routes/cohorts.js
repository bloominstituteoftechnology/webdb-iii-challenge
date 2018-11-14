const express = require('express');
const knex = require('knex');

const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

const router = express.Router();

// endpoints here
router.post('/', (req, res) => {
    const cohort = req.body;
  
    if (!corhort.name){
      res.status(401).json({message: "name is required"});
      return;
    }
  
    db('cohorts')
      .insert(cohort)
      .returning('id')
      .then(ids => res.status(201).json(ids))
      .catch(error => res.status(500).json({message:'error posting cohort', error}));
  
})

router.get('/', (req, res) => {
db('cohorts')
    .then(cohorts => res.status(200).json(cohorts))
    .catch(error => res.status(500).json(error));
})

router.get('/:id', (req, res) => {
const { id } = req.params;

db('cohorts')
    .where({id})
    .then(cohort => {
    if (!cohort.length) {
        res.status(404).json({message: 'cohort by id not found'})
        return
    }
    res.status(200).json({cohort})
    })
    .catch(error => res.status(500).json({message: 'error getting cohort by id', error}))

})

router.delete('/:id', (req, res) => {
const { id } = req.params;

db('cohorts')
    .where({id})
    .del()
    .then(count => {
    res.status(200).json({message: `${count} cohorts deleted`})
    })
    .catch(error => res.status(500).json({message: 'error deleting cohort by id', error}))

})

router.put('/:id', (req, res) => {
const { id } = req.params;

const cohort = req.body;

if (!cohort.name){
    res.status(401).json({message: "name is required"});
    return;
}

db('cohorts')
    .where({id})
    .update({name: cohort.name})
    .then(count => res.status(200).json({message: `${count} cohorts updated`}))
    .catch(error => res.status(500).json({message: 'error updating cohort by id', error}))

})

module.exports = router;
  
