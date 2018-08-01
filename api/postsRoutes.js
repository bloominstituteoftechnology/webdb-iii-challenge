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

router.get('/:id/tags', (req, res, next) => {
  const { id } = req.params;
  db('posts')
    .where({ id })
    .then(response => {
      if(!response[0]) {
        next({ code: 404 })
      } else {
        db('tags')
          .where({ postId: id})
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
    .catch(() => {
      next({ code: 500 })
    })
})

router.post('/:id', (req, res, next) => {
  const { id } = req.params;
  const text = req.body.text;
  const post = { userId: id, text };
  if(!(id.id || text)) {
    next({ code: 400 })
  } else {
    db('users')
      .where({ id })
      .then(response => {
        if(!response[0]) {
          next({ code: 404 })
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
    db('posts')
      .where({ id })
      .update(post)
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
  db('posts')
    .where({ id })
    .del()
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