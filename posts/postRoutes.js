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

router.get('/:id', (req, res) => {
  db('posts').where('id', req.params.id)
    .then(post => {
      if (post.length === 0) {
        res.status(200).send({ error: 'A post with this id does not exist.'});
      }
      res.status(200).json(post);
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