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

users.get('/:id/posts', async (req, res) => {
  const id = +req.params.id

  try {
    const posts = await db('posts')
      .where('userId', '=', id)
      .select()
    res.status(200).json(posts)
  } catch(e) {
    next(e)
  }
})

users.put('/:id', async (req, res, next) => {
  const id = +req.params.id
  const { body: user } = req

  try {
    const numberOfRowsUpdated = await db('users')
      .where('id', '=', id)
      .update(user)

    res.status(200).json({ id, ...user })

  } catch(e) {
    next(e)
  }
})

users.delete('/:id', async (req, res, next) => {
  const id = +req.params.id

  try {
    const numberOfRowsDeleted = await db('users')
      .where('id', '=', id)
      .del()
  
    res.status(200).send(`User (${id}) successfully deleted`)

  } catch(e) {
    next(e)
  }
})

users.use((err, req, res, next) => {
  res.status(500).json(err)
})

module.exports = users
