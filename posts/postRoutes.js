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
  const { id } = req.params;

  db('posts')
    .where({ id })
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

  db.insert(post).into('posts')
    .then(ids => {
      const id = ids[0]
      res.status(201).json({id, ...post});
    })
    .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  const { userId, text } = req.body;
  const { id } = req.params;

  db('posts')
    .where({ id })
    .update({ userId, text })
    .then(count => {
      if (count) {
        db('posts')
          .where({ id })
          .then(post => {
            res.status(200).json(post);
          })
          .catch(err => res.status(500).json(err));
      } else {
        res.status(200).send({ error: 'A post with this id does not exist.'});
      }
    })
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let deletedPost;

  db('posts')
    .where({ id })
    .then(post => {
      if (post.length === 0) {
        res.status(200).send({ error: 'A post with this id does not exist.'});
      }
      deletedPost = post;
    })
    .catch(err => res.status(500).json(err));

  db('posts')
    .where({ id })
    .del()
    .then(count => {
      if (count) {
        res.status(200).json(deletedPost);
      } else {
        res.status(200).send({ error: 'A post with this id does not exist.'});
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;