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

users.post('/', async (req, res, next) => {
  const { body: user } = req
  try {
    const userIds = await db.insert(user).into('users')
    const id = userIds[userIds.length - 1]
    res.status(200).json({ id, ...user })
  } catch(e) {
    next(e)
  }
})

users.use((err, req, res, next) => {
  res.status(500).json(err)
})

module.exports = users
