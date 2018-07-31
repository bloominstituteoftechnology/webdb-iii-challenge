const users = require('express').Router()
const db = require('../data/db.js')

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

users.get('/', async (req, res, next) => {
  try {
    const users = await db('users')
    res.status(200).json(users)
  } catch(e) {
    next(e)
  }
})

users.get('/:id', async (req, res, next) => {
  const id = +req.params.id

  try {
    const user = await db('users')
      .where('id', '=', id) 
      .select()

    res.status(200).json(user)
  } catch(e) {
    next(e)
  }
})

users.use((err, req, res, next) => {
  res.status(500).json(err)
})

module.exports = users
