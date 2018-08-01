const express = require('express')

const router = express.Router()

const db = require('../data/db')

router.get('/', (req, res) => {
  // db
  //   .get()
  db('users')
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => res.status(500).json(err))
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  db('users').where('id', id)
    .then(user => {
      if (!user) res.status(404).json({ error: `user with id ${id} not found.` })
      res.status(200).json(user)
    })
    .catch(err => res.status(500).json(err))
})

router.get('/:id/posts', (req, res) => {
  const { id } = req.params

  db
    .getUserPosts(id)
    .then(userPosts => {
      console.log('IN USER userPosts', userPosts)
      res.status(200).json(userPosts)
    })
    .catch(err => res.status(500).json(err))
})

router.post('/', (req, res) => {
  const user = req.body
  if (user.name === undefined || user.name.length > 128) {
    res
      .status(400)
      .json({ error: 'Name field is required (128 characters maximum).' })
  }
  db.insert(user).then(ids => {
    const { id } = ids
    res.status(201).json({ id, ...user })
  }).catch(err => res.status(500).json(err))
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const user = req.body

  if (user.name === undefined || user.name.length > 128) {
    res
      .status(400)
      .json({ error: 'Name field is required (128 characters maximum).' })
  }
  db
    .update(id, user)
    .then(count =>
      db
        .get(id)
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json(err)))
    .catch(err => res.status(500).json(err))
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  db
    .remove(id)
    .then(deletions => {
      if (deletions === 1) {
        res.status(200).json({ success: `user with id ${id} was deleted.` })
      } else {
        res.status(404).json({ error: `user with id ${id} was not found.` })
      }
    }).catch(err => res.status(500).json(err))
})

module.exports = router
