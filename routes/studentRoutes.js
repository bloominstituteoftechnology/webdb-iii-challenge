const express = require('express');
const router = express.Router();
const db = require('../dbConfig.js');

router.get('/', (req, res, next) => {
  db('students')
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
  db('students')
    .where({ id: req.params.id })
    .then(data => {
      if (data.length < 1) {
        return next({ code: 404 });
      }
      res.status(200).json(data);
    })
    .catch(err => next(err));
});

module.exports = router;
