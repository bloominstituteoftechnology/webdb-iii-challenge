const express = require('express');

const server = express();

const db = require('./db/knexconfig');

const port = process.env.PORT || 9000;

server.use(express.json());

// ============================= COHORTS =================================\

server.get('/cohorts', (req, res) => {
  db('cohorts')
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json({ message: 'Bad request' }));
});

server.get('/cohorts/:id/students', (req, res) => {
  const { id } = req.params;
  db.from('students')
    .join('cohorts', 'cohorts.id', '=', 'students.cohort_id')
    .select('students.name', 'cohorts.name as cohort_name')
    .where({ 'cohorts.id': id })
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json(err));
});

server.get('/cohorts/students', (req, res) => {
  db('students')
    .join('cohorts', 'cohorts.id', '=', 'students.cohort_id')
    .select('students.name', 'cohorts.name as cohort_name')
    .map(item => {
      const obj = {
        name: '',
        cohort: ''
      };
      obj.name = item.name;
      obj.cohort = item.cohort_name;

      return obj;
    })
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json(err));
});

server.post('/cohorts', (req, res) => {
  const cohort = req.body;
  db('cohorts')
    .insert(cohort)
    .then(id => res.status(201).json(id))
    .catch(err => res.status(500).json({ message: 'Bad request' }));
});

server.get('/cohorts/:id', (req, res) => {
  const { id } = req.params;

  db('cohorts')
    .where({ id: id })
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json({ message: 'Bad request' }));
});

server.put('/cohorts/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  db('cohorts')
    .where({ id: id })
    .update(body)
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json({ message: 'Bad request' }));
});

server.delete('/cohorts/:id', (req, res) => {
  const { id } = req.params;

  db('cohorts')
    .where({ id: id })
    .del()
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json({ message: 'Bad request' }));
});

// ============================== STUDENTS ================================= \\

server.get('/students', (req, res) => {
  db('students')
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json({ message: 'Bad request' }));
});

server.post('/students', (req, res) => {
  const cohort = req.body;
  db('students')
    .insert(cohort)
    .then(id => res.status(201).json(id))
    .catch(err => res.status(500).json({ message: 'Bad request' }));
});

server.get('/students/:id', (req, res) => {
  const { id } = req.params;

  db('students')
    .where({ id: id })
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json({ message: 'Bad request' }));
});

server.put('/students/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  db('students')
    .where({ id: id })
    .update(body)
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json({ message: 'Bad request' }));
});

server.delete('/students/:id', (req, res) => {
  const { id } = req.params;

  db('students')
    .where({ id: id })
    .del()
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json({ message: 'Bad request' }));
});

server.listen(port, () => {
  console.log(`\n == Server listening on Port ${port} ==`);
});
