const router = require('express').Router();
const db = require('knex')(require('../knexfile').development);

router.post('/', (req, res) => {
  if (!req.body.name) {
    res.status(404).json({ error: 'Cohorts require a name.' });
  } else {
    db('cohorts')
      .insert(req.body)
      .then(id => res.status(201).json(id))
      .catch(err => res.status(500).json(err));
  }
});

router.get('/', (req, res) => {
  db('cohorts')
    .then(cohorts => res.status(200).json(cohorts))
    .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('cohorts')
    .where({ id })
    .then(cohort => {
      if (cohort) res.status(200).json(cohort);
      else res.status(404).json({ error: 'The cohort with the specified ID wasn\'t found.' });
    })
    .catch(err => res.status(500).json(err));
});

router.get('/:id/students', (req, res) => {
  db('students')
    .where({ 'cohort_id': req.params.id })
    .then(students => {
      if (students) res.status(200).json(students);
      else res.status(404).json({ error: 'No students were found associated with the given cohort ID.' })
    })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where({ id })
    .del()
    .then(count => {
      if (count) res.status(200).json(count);
      else res.status(404).json({ error: 'The cohort with the specified ID wasn\'t found.' });
    })
    .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  db('cohorts')
    .where({ id })
    .update(req.body)
    .then(count => {
      if (count) res.status(200).json(count);
      else res.status(404).json({ error: 'The cohort with the specified ID wasn\'t found.' });
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
