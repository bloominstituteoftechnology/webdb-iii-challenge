const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);
const router = express.Router();


//gets all students
router.get('/', (req, res) => {
  db('students')
    .then(students => res.status(200).json(students))
    .catch( error => res.status(500).json({message: 'an error occured while retrieving data', error}))
})

//gets student by id
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db('students')
    .where({id: id})
    .then( student => res.status(200).json(student))
  .catch(error => res.status(500).json({message: 'an error occured while retrieving data', error}))
  
})

//adds a new student
router.post('/', (req, res) => {
  const student = req.body;
  db('students')
  .insert(student)
  .then( count => {
    res.status(201).json(count)
  })
  .catch( error => {
    res.status(500).json({ message: 'Error inserting zoo', error})
  })
})

//updates the students
router.put('/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('students')
    .where({ id: id})
    .update(changes)
    .then(count => {
      res.status(201).json(count)
    })
    .catch( error => {
      res.status(500).json({ message: 'error updating zoo', error })
    })
})

// deletes students
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('students')
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