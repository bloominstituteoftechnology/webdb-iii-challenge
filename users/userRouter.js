const express = require('express')

const router = express.Router()

const db = require('../data/db')

router.get('/', (req, res) => {
  db('users').then(users => {
    res.status(200).json(users)
  }).catch(err => res.status(500).json(err))
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  db('users').get(id).then(user => {
    res.status(200).json(user)
  }).catch(err => res.status(500).json(err))
})

router.post('/', (req, res) => {
  const user = req.body
  const { name } = user

  // ! NEED MORE ERROR HANDLING
  if (!name) res.status(400).json('msg: user must have a name field')

  db.insert(user).into('users').then(ids => {
    const id = ids[0]
    res.status(201).json({ id, ...user })
  }).catch(err => res.status(500).json(err))
})

module.exports = router
