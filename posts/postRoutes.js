const express = require('express');
const db = require('../data/db');
const router = express.Router();

router.get('/', (req, res) => {
  db('posts')
    .then( posts => {
      res.status(200).json(posts);
    })
    .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  const post = req.body;

  db.insert(post).into('posts').then(ids => {
      const id = ids[0]
      res.status(201).json({id, ...post});
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;