//Cohorts Routes
const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

//list all
router.get('/', (req, res) => {
  db('cohorts').then(cohorts => {
    res.status(200).json(cohorts);
  })
  .catch(err => res.status(500).json(err));
});

//create
router.post('/', (req, res) => {
  const cohort = req.body;
  db.insert(cohort)
  .into('cohorts')
  .then(ids => {
    res.status(201).json(ids);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

// return by id, need the async so we can use await
router.get('/:id', async (req, res) => {
  //try/catch for error catching
  try {
  const { id } = req.params;
// this is a filter, an object that we pass in what we want from the db, in this case id
//we have to name this next part, zoos, b/c we are calling it below
//otherwise we just get an empty object when we invoke this path  
const cohorts = await db('cohorts').where({ id }).first();
  res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json(error);
  }
});
//we get an array back, why? b/c 'where' always gives back a collection
//which is presented in the form of an array so we can add .first()
//and it will give the individual objs w/out putting them in an array by 
//themselves



//get cohort student by id
router.get('/:id/students', (req, res) => {
  const { id } = req.params;
  db('cohorts')
  .join('students', 'cohorts.id', '=', 'students.cohort_id')
  .select('cohorts.name', 'students.name')
  .where('students.cohort_id', id)
  .then(response => {
    console.log(response)
    res.status(200).json(response)
  });
});

// delete
router.delete('/:id', (req,res) => {
  const { id } = req.params;
  db('cohorts')
  .where({ id })
  .delete()
  .then(count => {
    if(!count || count<1) {
      res.status(404).json({ message: 'No cohorts found to delete.' });
    } else {
      res.status(200).json(count);
    }
  })
  .catach(err => res.status(500).json({ message: 'failed to delete corhort.'}));


}); 

// update 
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db('cohorts')
  .where({ id })
  .update(changes)
  .then(count => {
    if(!count || count<1) {
      res.status(404).json({ message: 'No cohorts found to  update.' });
    } else {
      res.status(200).json(count);
    }
  })
  .catach(err => res.status(500).json({ message: 'failed to update cohorts.'}));
});

module.exports = router;