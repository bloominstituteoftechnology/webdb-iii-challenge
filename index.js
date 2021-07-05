const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const dbConfig = require('./knexfile');
const knex = require('knex');

const db = knex(dbConfig.development);

server.use(bodyParser.json());

server.get('/cohorts', (req, res) => {
  db('cohorts')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
    })
});

server.get('/cohorts/:id', (req, res) => {
  db('cohorts')
    .where({ id: req.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
    })
});

server.get('/cohorts/:id/students', (req, res) => {
  db('students')
    .where({ cohort_id: req.params.id })
    .innerJoin('cohorts', {'cohorts.id': 'students.cohort_id'})
    .select('cohorts.id', 'cohorts.name as Cohort', 'students.studentName')
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ message: "No students enrolled in this course" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(404).json({ message: "404 Item Not Found" });
    })
})

server.post('/cohorts', (req, res) => {
  db('cohorts').insert(req.body)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) => {
      console.error(err);
    })
});

server.put('/cohorts/:id', (req, res) => {
  db('cohorts')
    .where({ id: req.params.id })
    .update(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
    })
});

server.delete('/cohorts/:id', (req, res) => {
  db('cohorts')
    .where({ id: req.params.id })
    .del()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
    })
});

server.get('/students', (req, res) => {
  db('students')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
    })
});

server.post('/students', (req, res) => {
  db
    .insert(req.body)
    .into('students')
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Incorrect data sent" });
    })
})

server.listen(3000, () => {
  console.log(('== LISTENING ON PORT 3000 =='));
})
