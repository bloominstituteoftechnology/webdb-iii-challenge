const express = require('express');

const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

const router = express.Router();

router.post('/', (req, res) => {
    const student = req.body;
  
    db('students')
      .insert(student)
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => {
        res.status(500).json({ message: 'Error creating student', err });
      });
  });
  
  router.get('/', (req, res) => {
    db('students')
      .then(students => res.status(200).json(students))
      .catch(err => res.status(500).json({ message: 'could not get students', err }));
  });

  router.get('/:id', (req, res) => {
    db('students')
      .where({ id: req.params.id })
      .then(students => res.status(200).json({ id: students.id, name: students.name }))
      .catch(err => res.status(500).json({ message: 'could not get cohort', err }));
  });
  
  router.put('/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    
    db('students')
      .where({ id })
      .update(changes)
      .then(count => {
        res.status(200).json({ count });
      })
      .catch(err => res.status(500).json({ message: 'could not update student', err }));
  });
  
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    db('students')
      .where({ id })
      .del()
      .then(count => {
        res.status(200).json({ count });
      })
      .catch(err => res.status(500).json({ message: 'could not delete student', err }));
  });

  module.exports = router;