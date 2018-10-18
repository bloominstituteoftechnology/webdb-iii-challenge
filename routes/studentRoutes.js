//Students Routes
const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

//list all
router.get('/', (req, res) => {
    db('students').then(students => {
      res.status(200).json(students);
    })
    .catch(err => res.status(500).json(err));
  });

  //knex create
router.post('/', (req, res) => {
    const student = req.body;
    db.insert(student)
    .into('students')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
  });

  //knex return by id
router.get('/:id', async (req, res) => {
    try {
    const { id } = req.params;
    const students = await db('students').where({ id }).first();
    res.status(200).json(students);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  

  //knex delete
router.delete('/:id', (req,res) => {
    const { id } = req.params;
    db('students')
    .where({ id })
    .delete()
    .then(count => {
      if(!count || count<1) {
        res.status(404).json({ message: 'No students found to delete.' });
      } else {
        res.status(200).json(count);
      }
    })
    .catach(error => res.status(500).json({ message: 'failed to delete student.'}));
  
  
  }); 
  
  //knex update 
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    db('students')
    .where({ id })
    .update(changes)
    .then(count => {
      if(!count || count<1) {
        res.status(404).json({ message: 'No students found.' });
      } else {
        res.status(200).json(count);
      }
    })
    .catach(err => res.status(500).json({ message: 'failed to update student.'}));
  });

  module.exports = router;