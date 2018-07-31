const express = require('express');

const db = require('../data/db');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res, next) => {
  db('users')
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
  db
    .get(id)
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

router.get('/:id/posts', (req, res, next) => {
  const id = req.params.id;
  db
    .getUserPosts(id)
    .then(response => {
      if(!response[0]) {
        next({ code: 404 })
      } else {
        res
          .status(200)
          .json(resposne)
          .end()
      }
    })
    .catch(() => {
      next({ code: 500 })
    })
})

router.post('/', (req, res, next) => {
  const name = req.body.name;
  const user = { name };
  if(!name || name.length > 128) {
    next({ code: 400 })
  } else {
    db
      .insert(user)
      .into('users')
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
  const name = req.body.name;
  const user = { name };
  if(!name || name.length > 128) {
    next({ code: 400 })
  } else {
    db
      .update(id, user)
      .into('users')
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