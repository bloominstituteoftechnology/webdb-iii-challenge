const express = require('express');
const router = express.Router();
const knex = require('knex');
const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

router.get('/api/cohorts', (req,res) => {
  db('cohorts')
  .then( cohortInfo => {
       res.json(cohortInfo);
  })
  .catch(err=> {
      res.status(500).json({err: "Failed to get cohorts"})
  });
});

router.get('/api/cohorts/:id', (req,res)=> {
 const id = req.params.id;
 db('cohorts')
 .where('id', id)
 .then( cohort => {
     res.json(cohort);
  })
  .catch(err=> {
    res.status(500).json({err: `Failed to get cohort with ${id}`})
});
});

router.get('/api/cohorts/:id/students', (req,res) => {
  const id = req.params.id;
  db('students').where('cohort_id', id )
  .then( students => {
      if(students.length > 0) {
           res.status(200).json(students)
      } else {
           res.status(404).json({message: `The specified students with ID ${id} does not exists`})
      }
  }) .catch(err=> {
    res.status(500).json({err: `Failed to get the students with the cohort ID ${id}`})
});

})

router.post('/api/cohorts/', (req,res) => {
  const cohort = req.body;
  console.log(cohort);
  db('cohorts')
  .insert(cohort)
  .then( cohortID => {
     res.status(201).json(cohortID);
  })
  .catch(err=> {
    res.status(500).json({err: "Failed to post cohort"})
      });
});

router.put('/api/cohorts/:id', (req,res) => {
 const {id} = req.params;
 const cohort = req.body;
 db('cohorts').where('id', id)
 .update(cohort)
 .then( newCohortRowCount => {
     res.json(newCohortRowCount)
 }) .catch(err=> {
  res.status(500).json({err: `Failed to update the cohort with the ${id}`})
   });
});

router.delete('/api/cohorts/:id', (req,res) => {
  const {id} = req.params;
  db('cohorts').where('id', id).del()
  .then( count => {
      res.status(201).json({Message: `Deleted cohort with the ID ${id} successfully`});
  }) .catch(err=> {
    res.status(500).json({err: `Failed to delete the cohort with the ID ${id}`})
    });
});

module.exports = router;
