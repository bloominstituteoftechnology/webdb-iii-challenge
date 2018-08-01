const express = require('express');

const db = require('../data/db');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res, next) => {
  db('posts')
    .then(response => {
      res
        .status(200)
        .json(response)
        .end()
    })
    .catch(() => {
      next({ code: 500 })
    })
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  db('posts')
    .where({ id })
    .then(response => {
      if(!response[0]) {
        next({ code: 404 })
      } else {
        res
        .status(200)
        .json(response)
        .end()
      }
    })
    .catch(() => {
      next({ code: 500 })
    })
})

router.post('/:id', (req, res, next) => {
  const userId = req.params.id;
  const text = req.body.text;
  const post = { userId, text };
  if(!(userId || text)) {
    next({ code: 400 })
  } else {
    db
      .insert(post)
      .into('posts')
      .then(response => {
        res
          .status(200)
          .json(response)
          .end()
      })
      .catch(() => {
        next({ code: 500 })
      })
  }
})

router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const userId = req.body.userId;
  const text = req.body.text;
  const post = { userId, text };
  if(!text) {
    next({ code: 400 })
  } else {
    db
      .update(id, post)
      .into('posts')
      .then(response => {
        if(!response) {
          next({ code: 404 })
        } else {
          res
            .status(200)
            .json(response)
            .end()
        }
      })
      .catch(() => {
        next({ code: 500 })
      })
  }
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  db
    .remove(id)
    .then(response => {
      if(!response) {
        next({ code: 404 })
      } else {
        res
          .status(200)
          .json({ success: true})
          .end()
      }
    })
    .catch(() => {
      next({ code: 500 })
    })
})

module.exports = router;