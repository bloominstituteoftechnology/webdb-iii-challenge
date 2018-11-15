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
    const { id } = req.params;
    db('students')
        .join('cohorts', 'cohorts.id', 'students.cohort_id')
        .select('students.id', 'students.name', 'cohorts.name as cohort')
        .where('students.id', id)
        .first()
        .then(name => {
            res.status(200).json(name);
        })
        .catch(err => {
            res.status(500).json({ message: 'could not get student id', err });
        });
        
    /*
    Figured out another way to do the stretch
    const {id} = req.params;
    db('students').where('id', Number(id)).first()
    .then(student => {
        if (student) {
            db('cohorts').where('id', Number(student.cohort_id)).first()
            .then(cohort => {
                if (cohort) {
                    res.status(200).json({id: student.id, name: student.name, cohort: cohort.name})
                } else {
                    res.status(404).json({message: "The cohort with the provided ID does not exist"})
                }
            })
        } else {
            res.status(404).json({message: "The student with the provided ID does not exist"})
        }
    })
    .catch(err => res.status(500).json({message: "The student information could not be retrieved", err}));
    */
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