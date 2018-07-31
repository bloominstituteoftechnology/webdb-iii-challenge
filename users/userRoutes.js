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

router.get('/:id', (req, res) => {
  db('users').where('id', req.params.id)
    .then(user => {
      if (user.length === 0) {
        res.status(200).send({ error: 'A user with this id does not exist.'});
      }
      res.status(200).json(user);
    })
    .catch(err => res.status(500).json(err));
});

router.get('/:id/posts', (req, res) => {
  db('posts').where('userId', req.params.id)
    .then(posts => {
      if (posts.length === 0) {
        res.status(200).send({ error: 'This user has not posted.'});
      }
      res.status(200).json(posts);
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