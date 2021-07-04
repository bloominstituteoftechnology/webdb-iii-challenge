const express = require('express');

const cohorts = require('./cohortsModel');

const router = express.Router();


// Create Cohorts
router.post('/', (req, res) => {
    const name = req.body;
    console.log(name);
    cohorts
    .add(name)
    .then(cohortId => {
        res.status(201).json( cohortId )
        })
        .catch(err => res.status(500).json(err))
    });
    
   //Get a list of Cohorts 
  router.get('/', (req, res) => {
    cohorts
    .find()
    .then(cohorts => {
      res
        .status(200)
        .json(cohorts)
    })
      .catch(err => res.send(err))
  });


  //Get a cohort by ID
  router.get('/:id', async (req, res) => {
    try {
  
      const { id } = req.params;
      const cohort = await courses.findById(id);
        
            if(cohort) {
              res
              .status(200)
              .json(cohort)
            }
            else {
            res
            .status(404)
            .json({ message: `No Cohort Found with ID ${id}!`})
            }
    } catch(err) {
        res
        .status(500)
        .json(err)
    }
  });

  //Get a student in a cohort with a certain id

  router.get('/:id/students', async (req, res) => {
    try {
  
      const { id } = req.params;
      const cohort = await courses.findById(id);
        
            if(cohort) {
              res
              .status(200)
              .json(cohort)
            }
            else {
            res
            .status(404)
            .json({ message: `No Cohort Found with ID ${id}!`})
            }
    } catch(err) {
        res
        .status(500)
        .json(err)
    }
  });
  
  //Update Cohorts
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    cohorts
      .update(id, changes)
      .then(count => { 
        if(!count || count < 1) {
          res
          .status(404)
          .json({message: `There is no record at ID ${id} to update. Please input a valid ID.`})
        } else {
          res
          .status(200)
          .json(count);
        }
    })
    .catch(err => res.status(500).json(err));
  });
  
  // Delete Cohorts
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
      cohorts
      .remove(id)
      .then(count => { 
        if(!count || count < 1) {
          res
          .status(404)
          .json({message: `There is no record at ID ${id} to delete. Please input a valid ID.`})
        } else {
          res
          .status(200)
          .json(count);
        }
    })
    .catch(err => res.status(500).json(err));
    
  });

  module.exports = router;