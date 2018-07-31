const users = require('express').Router()
const db = require('../data/db.js')

users.get('/', async (req, res, next) => {
  try {
    const users = await db('users')
    res.status(200).json(users)
  } catch(e) {
    next(e)
  }
})

users.use((err, req, res, next) => {
  res.status(500).json(err)
})

module.exports = users
