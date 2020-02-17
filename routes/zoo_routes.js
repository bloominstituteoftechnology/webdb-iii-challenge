const express = require('express');
const router = express.Router();
const courses = require('./zoo_functions.js');

router.post('/', (req, res) => {
  const { name } = req.body;
  courses
    .add({name})
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/', (req, res) => {
  courses
    .find()
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;