const router = require('express').Router();
const db = require('knex')(require('../knexfile').development);

router.post('/', (req, res) => {
  if (!req.body.name) {
    res.status(404).json({ error: 'Students require a name.' });
  } else {
    db('students')
      .insert(req.body)
      .then(id => res.status(201).json(id))
      .catch(err => res.status(500).json(err));
  }
});

router.get('/', (req, res) => {
  db('students')
    .then(students => res.status(200).json(students))
    .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('students as s')
    .leftJoin('cohorts as c', { 'c.id': 's.cohort_id' })
    .select('s.id', 's.name', 'c.name as cohort')
    .then(students => students.find(student => student.id === +id))
    .then(student => {
      if (student) res.status(200).json(student);
      else res.status(404).json({ error: 'The student with the specified ID wasn\'t found.' });
    })
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db('students')
    .where({ id })
    .del()
    .then(count => {
      if (count) res.status(200).json(count);
      else res.status(404).json({ error: 'The student with the specified ID wasn\'t found.' });
    })
    .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  db('students')
    .where({ id })
    .update(req.body)
    .then(count => {
      if (count) res.status(200).json(count);
      else res.status(404).json({ error: 'The student with the specified ID wasn\'t found.' });
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
