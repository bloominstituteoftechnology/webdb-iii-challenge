const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const router = express.Router();

// connect to the database
const db = knex(knexConfig.development);


// add students
router.post('/', (req, res) => {

  const {name} = req.body;

  db('students')
    .insert({name})
    .then(ids => {
      db('students')
        .where({ id: ids[0] })
        .then(students => {
          res.status(201).json(students);
        });
    })
    .catch(err => res.status(500).json(err));
});

// list students
router.get('/', (req, res) => {

  db('students')
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => res.status(500).json(err));
});

// retive a student
// need to retrive student with the cohort name
router.get('/:id', (req, res) => {

  const {id} = req.params;

  db('students')
    .where({id})
    .then(student => {
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({ message: 'student not found' });
      }
    })
    .catch(err => res.status(500).json(err));
});

// delete students
router.delete('/:id', (req, res) => {
  const {id} = req.params;

  db('students')
    .where({id})
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

// update students
router.put('/:id', (req, res) => {
  const {id} = req.params;
  const {name} = req.body;

  db('students')
    .where({id})
    .update({name})
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: 'student not found' });
      }
    })
    .catch(err => res.status(500).json(err));
});

exports.module = router;