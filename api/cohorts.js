const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);

const router = express.Router();

//routes

//GET array of all cohorts
router.get('/', (req, res) => {
  db('cohorts')
    .then(cohorts => res.status(200).json(cohorts))
    .catch(err => res.status(500).json(err));
});

//GET cohort by id
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db('cohorts')
    .where({ id })
      .then(cohort => cohort.length ?
                        res.status(200).json(cohort[0]) :
                        res.status(404).json({ message: "No cohort with that id" })
      )
      .catch(err => res.status(500).json(err));
});

//GET all students by cohort id
router.get('/:id/students', (req, res) => {
  const { id } = req.params;

  db('students')
    .where({ cohort_id: id })
      .then(students => students.length ?
                          res.status(200).json(students) :
                          res.status(404).json({ message: "There are no students in that cohort" })
      )
      .catch(err => res.status(500).json(err));
})

//POST a new cohort
router.post('/', (req, res) => {
  const { name } = req.body;
  if(!name) return res.status(422).json({ message: "A name is required for that operation" })

  db
    .insert({ name })
    .into('cohorts')
    .then(id => res.status(201).json(id))
    .catch(err => res.status(500).json(err));
});

//PUT (update) cohort with id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if(!name) return res.status(422).json({ message: "A name is required for that operation" });

  db('cohorts')
    .where({ id })
    .update({ name })
    .then(count => res.status(200).json(count))
    .catch(err => res.status(500).json(err));
});

//DELETE cohort by id
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('cohorts')
    .where({ id })
    .del()
    .then(delCohort => res.status(200).json(delCohort))
    .catch(err => res.status(500).json(err));
})

module.exports = router;
