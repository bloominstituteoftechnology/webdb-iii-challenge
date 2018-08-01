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
  db('users')
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

router.get('/:id/posts', (req, res, next) => {
  const id = req.params.id;
  db('users')
    .where({ id })
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
  const { id } = req.params;
  const name = req.body;
  if(!name.name || name.name.length > 128) {
    next({ code: 400 })
  } else {
    db('users')
      .where({ id })
      .update(name)
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
  db('users')
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