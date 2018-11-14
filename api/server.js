const express = require('express');
const knex = require('knex');
// const helmet = require('helmet');

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

const nameCheck = require('../middleware/nameCheck.js')


const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

// TABLE SCHEMA
// id: integer, primary key, autoincrements
// name: text, required, unique

// endpoints here

// COHORTS
// POST: .insert() .into
server.post('/api/cohorts', nameCheck, (req, res) => {
  const cohort = req.body;

  db('cohorts')
    .insert(cohort)
    // .returning('*') // other databases allow other items to be returned
    .then(ids => {
      res.status(201).json({ id: ids[0]});
    })
    .catch(err => {
      res.status(500).json({ message: 'Error inserting', err })
    })
})

// GET (assumes .select())
server.get('/api/cohorts', (req, res) => {

  db('cohorts')
  //.select()
    .then(cohorts => res.status(200).json(cohorts))
    .catch(err => res.status(500).json({ err }));
});

// GET BY ID
server.get('/api/cohorts/:id', (req, res) => {

  db('cohorts')
    .then(cohorts => res.status(200).json(cohorts[0]))
    .catch(err => res.status(500).json({ err }));
});

// PUT .where() .update()
server.put('/api/cohorts/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('cohorts')
    .where({ id: id }) // 
    .update(changes)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

// DELETE .where() .del()
// Calling .del() without first filtering the records will result on the removal of all the records in the table, be careful!

server.delete('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;

  db('cohorts')
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

// STUDENTS
// POST: .insert() .into
server.post('/api/students', nameCheck, (req, res) => {
  const student = req.body;

  db('students')
    .insert(student)
    // .returning('id')
    .then(ids => {
      res.status(201).json({ id: ids[0]});
    })
    .catch(err => {
      res.status(500).json({ message: 'Error inserting', err })
    })
})

// GET 
server.get('/api/students', (req, res) => {

  db('students')
    .then(students => res.status(200).json(students))
    .catch(err => res.status(500).json({ err }));
});

// GET BY ID
server.get('/api/students/:id', (req, res) => {

  db('students')
    .then(students => res.status(200).json(students[0]))
    .catch(err => res.status(500).json({ err }));
});

// PUT .where() .update()
server.put('/api/students/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('students')
    .where({ id: id }) // 
    .update(changes)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

// DELETE .where() .del()
// Calling .del() without first filtering the records will result on the removal of all the records in the table, be careful!

server.delete('/api/students/:id', (req, res) => {
  const { id } = req.params;

  db('students')
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});


// JOIN
server.get('/api/cohorts-join-students', (req, res) => {
  return db('cohorts')
    .join('students', 'cohorts.id', '=', 'students.cohorts_id')
    // .select('cohorts.name', 'students.name')
    .select('*')
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => res.status(500).json(err));
})

module.exports = server;