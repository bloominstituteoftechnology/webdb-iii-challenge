const posts = require('express').Router()
const db = require('../data/db.js')

posts.post('/', async (req, res) => {
  const { body: post } = req
  
  if(!post.userId || !post.text) {
    res.status(400).send("please provide userId and text")
  }

  try  {
    const postIds = await db('posts')
      .insert(post)
    const id = postIds[postIds.length - 1]
    res.status(200).json({ id, ...post }) 
  } catch(e) {
    next(e)
  }
})

posts.get('/', async (req, res) => {
  try {
    const posts = await db('posts')
    res.status(200).json(posts)
  } catch(e) {
    next(e)
  }
})

posts.get('/:id', async (req, res) => {
  const id = +req.params.id

  try { 
    const post = await db('posts')
      .where('id', '=', id)
      .select()

    res.status(200).json(post)
  } catch(e) {
    next(e)
  }
})

posts.use((err, req, res, next) => {
  res.status(500).json(error)
})

module.exports = posts
