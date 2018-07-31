const express = require('express');
const db = require('../data/db');
const router = express.Router();

router.get('/', (req, res) => {
  db('users')
    .then( users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  const user = req.body;

  db.insert(user).into('users').then(ids => {
      const id = ids[0]
      res.status(201).json({id, ...user});
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;