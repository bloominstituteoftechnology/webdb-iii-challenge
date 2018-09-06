const express = require('express');
const knex = require('knex');

const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

const router = express.Router();


router.get('/', (req, res) => {
  db('students').select()
  .then(students => {
    students.length === 0 ?
    res.status(200).json({message: 'No Students Listed, Send a Post request to list a Student'})
    :
    res.status(200).json(students)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json('Error')
  });
});


router.get('/:id', (req, res) => {
  const { id } = req.params;

  db('students').where({ id }).select()
  .then(zoo => {
    zoo.length === 0 ?
    res.status(400).json({message: 'No Students Listed, check your id'})
    :
    res.status(200).json(zoo)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json('Error')
  });
});


router.post('/', (req, res) => {
  
  !req.body.name || !req.body.cohort_id ?
  res.status(400).json({message: 'You need a valid name AND cohort_id'})
  :
  null
  
  const { name, cohort_id } = req.body;
  const body = { name, cohort_id }

  db.insert(body).into('students')
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
  db('students').where({id}).del()
  .then(count => {
    count === 0 ?
    res.status(400).json({message: 'Error deleting Student, check your id'})
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
  
  !req.body.name || !req.body.cohort_id ?
  res.status(400).json({message: 'You need a valid name AND cohort_id'})
  :
  null

  const { name, cohort_id } = req.body;
  const body = { name, cohort_id }

  db('students').where({id}).update(body)
  .then(count => {
    count === 0 ?
    res.status(400).json({message: 'Error updating Student, check your id'})
    :
    res.status(200).json(count)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('Error')
  });
})


module.exports = router;
