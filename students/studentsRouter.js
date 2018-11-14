const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);

router.get('/', (req, res) => {
  db('students')
    .then(students => res.status(200).json(students))
    .catch(err => res.status(500).json(err));
});

router.get('/:studentid', (req, res) => {
  const { studentid } = req.params;
  db('students')
    .then(student => res.status(200).json(student))
    .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  const student = req.body;

  db('students')
    .insert(student)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error inserting', err });
    });
});

router.get('/:studentid', (req, res) => {
  const { studentid } = req.params;

  db('students')
    .where({ id: studentid })
    .then(student => {
      res.status(201).json({ student });
    })
    .catch(err => res.status(500).json(err));
});

router.put('/:studentid', (req, res) => {
  const changes = req.body;
  const { studentid } = req.params;

  db('students')
    .where({ id: studentid })
    .update(changes)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});


router.delete('/:studentid', (req, res) => {
  const { studentid } = req.params;

  db('students')
    .where({ id: studentid })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});


module.exports = router