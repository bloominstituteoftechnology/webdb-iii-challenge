const express = require('express');
const router = express.Router();

const knex = require('knex');
const dbConfig = require('../knexfile.js');
const db = knex(dbConfig.development);

router.get('/api/students', (req,res) => {
      
        db('students')
        .then( student => {
            res.json(student);
        })
        .catch(err => {
           res.status(500).json({err: `Failed to get the students`});
        });
});

router.get('/api/students/:id', (req,res) => {
       const {id} = req.params;
       db('students')
       .where('id', id)
       .then( newStudent => {
           res.json(newStudent);
       })
       .catch(err => {
        res.status(500).json({err: `Failed to get the student with the ID ${id}`});
       });
       
});

router.get('/api/students/:id', (req,res) => {
  const {id} = req.params;
  db('cohorts')
  .where('id', id)
  .then( cohort => {
      res.json(cohort);
  })
  .catch(err => {
   res.status(500).json({err: `Failed to get the student with the ID ${id}`});
  });
  
});

router.post('/api/students', (req,res) => {
     const {id} = req.params;
     const student = req.body;
     if(!student) { 
        res.status(404).json({err: `Failed to insert the student`});
     }
     db('students')
     .where('id', id)
     .insert(student)
     .then( count => {
         res.status(201).json(count);
     })
     .catch(err => {
      res.status(500).json({err: `Failed to insert the student with the ID ${id}`});
     });
});

router.put('/api/students/:id', (req,res) => {
     const {id} = req.params;
     const student = req.body;

     db('students')
     .where('id', id)
     .update(student)
     .then( newStudent => {
        res.status(201).json(newStudent)
     })
     .catch(err => {
      res.status(500).json({err: `Failed to update the student with the ID ${id}`});
     });
});

router.delete('/api/students/:id', (req,res) => {
    const {id} = req.params;

    db('students')
    .where('id', id)
    .del()
    .then( count => {
       res.status(201).json({err: `Successfully deleted the student with ID ${id}`});
    })
    .catch(err => {
      res.status(500).json({err: `Failed to delete the student with the ID ${id}`});
     });
})

module.exports = router;