const express = require('express');
const knex = require('knex');

const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

const router = express.Router();


router.get('/', (req, res) => {
  db('cohorts').select()
  .then(cohorts => {
    cohorts.length === 0 ?
    res.status(200).json({message: 'No Cohorts Listed, Send a Post request to list a Cohort'})
    :
    res.status(200).json(cohorts)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json('Error')
  });
});


router.get('/:id', (req, res) => {
  const { id } = req.params;

  db('cohorts').where({ id }).select()
  .then(zoo => {
    zoo.length === 0 ?
    res.status(400).json({message: 'No Cohorts Listed, check your id'})
    :
    res.status(200).json(zoo)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json('Error')
  });
});


router.get('/:id/students', (req, res) => {
  const { id } = req.params;

  db('cohorts').where({ id }).select('name')
  .then(zoo => {
    zoo.length === 0 ?
    res.status(400).json({message: 'No Cohorts Listed, check your id'})
    :
    res.status(200).json(zoo)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json('Error')
  });
});


router.post('/', (req, res) => {
  !req.body.name ?
  res.status(400).json({message: 'You need a valid name'})
  :
  null
  const name = req.body;
  db.insert(name).into('cohorts')
  .then(count => {
    res.status(200).json(count)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('Error')
  });
})


router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db('cohorts').where({id}).del()
  .then(count => {
    count === 0 ?
    res.status(400).json({message: 'Error deleting Cohort, check your id'})
    :
    res.status(200).json(count)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('Error')
  });
})


router.put('/:id', (req, res) => {
  const { id } = req.params;
  !req.body.name ?
  res.status(400).json({message: 'You need a valid name'})
  :
  null
  const name = req.body;
  db('cohorts').where({id}).update(name)
  .then(count => {
    count === 0 ?
    res.status(400).json({message: 'Error updating Cohorts, check your id'})
    :
    res.status(200).json(count)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('Error')
  });
})


module.exports = router;
