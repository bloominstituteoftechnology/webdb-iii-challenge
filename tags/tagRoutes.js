const express = require('express');
const db = require('../data/db');
const router = express.Router();

router.get('/', (req, res) => {
  db('tags')
    .then( tags => {
      res.status(200).json(tags);
    })
    .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  db('tags').where('id', req.params.id)
    .then(tag => {
      if (tag.length === 0) {
        res.status(200).send({ error: 'A tag with this id does not exist.'});
      }
      res.status(200).json(tag);
    })
    .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  const tag = req.body;

  db.insert(tag).into('tags').then(ids => {
      const id = ids[0]
      res.status(201).json({id, ...tag});
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;