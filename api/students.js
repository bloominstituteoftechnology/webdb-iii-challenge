const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);

const router = express.Router();

//routes

//GET array of all students
router.get('/', (req, res) => {
  db('students')
    .then(students => res.status(200).json(students))
    .catch(err => res.status(500).json(err));
});

//GET student by id showing id, name and cohort name
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db
    .select('students.id as id', 'students.name as name', 'cohorts.name as cohort')
    .from('students')
    .where('students.id', '=', `${id}`)
    .leftJoin('cohorts', 'cohorts.id', 'students.cohort_id')
      .then(student => student.length ?
                        res.status(200).json(student[0]) :
                        res.status(404).json({ message: "No student with that id" })
      )
      .catch(err => res.status(500).json(err));
});

//POST a new student
router.post('/', (req, res) => {
  const { name, cohort_id } = req.body;
  if(!name || !cohort_id) return res.status(422).json({ message: "A name and cohort id is required for that operation" });

  db
    .insert({ name, cohort_id })
    .into('students')
    .then(id => res.status(201).json(id))
    .catch(err => res.status(500).json(err));
});

//PUT (update) student with id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, cohort_id } = req.body;

  if(!name && !cohort_id) return res.status(422).json({ message: "A name or cohort id is required for that operation" });

  db('students')
    .where({ id })
    .update(req.body)
    .then(count => count === 1 ?
                    res.status(200).json(count) :
                    res.status(404).json({ message: "No student with that id" })
    )
    .catch(err => res.status(500).json(err));
});

//DELETE student by id
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('students')
    .where({ id })
    .del()
    .then(delStudent => delStudent === 1 ?
                          res.status(200).json(delStudent) :
                          res.status(404).json({ message: "No student with that id" })
    )
    .catch(err => res.status(500).json(err));
})

module.exports = router;
