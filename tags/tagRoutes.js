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
  db('tags')
    .where('id', req.params.id)
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

  db.insert(tag).into('tags')
    .then(ids => {
      const id = ids[0]
      res.status(201).json({id, ...tag});
    })
    .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  const { tag } = req.body;
  const { id } = req.params;

  db('tags')
    .where({ id })
    .update({ tag })
    .then(count => {
      if (count) {
        db('tags')
          .where({ id })
          .then(tag => {
            res.status(200).json(tag);
          })
          .catch(err => res.status(500).json(err));
      } else {
        res.status(200).send({ error: 'A tag with this id does not exist.'});
      }
    })
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let deletedTag;

  db('tags')
    .where({ id })
    .then(tag => {
      if (tag.length === 0) {
        res.status(200).send({ error: 'A tag with this id does not exist.'});
      }
      deletedTag = tag;
    })
    .catch(err => res.status(500).json(err));

  db('tags')
    .where({ id })
    .del()
    .then(count => {
      if (count) {
        res.status(200).json(deletedTag);
      } else {
        res.status(200).send({ error: 'A tag with this id does not exist.'});
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;