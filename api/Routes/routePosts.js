const server = require('express')()
const db = require('../../data/dbConfig')
// GET ALL POST
function getPosts (req, res, next) {
  const { id } = req.params
  if (id) {
    db('posts')
      .where({ id })
      .then((post) => {
        if (!post.length > 0) {
          next(new Error(`CANT_FIND`))
        }
        res.status(200).json(post)
      })
      .catch(next)
  } else {
    db('posts').then((posts) => res.status(200).json(posts)).catch(next)
  }
}
// ADD A POST
function newPost (req, res, next) {
  const post = req.body
  if (!post.text || !post.userID) {
    next(new Error('INVALID_POST'))
  }
  db
    .insert(post)
    .into('posts')
    .then((posts) => {
      const id = posts[0]
      db('posts')
        .where('id', id)
        .then((post) => res.status(201).json(post))
        .catch((err) => res.status(500).json(err))
    })
    .catch((err) => res.status(500).send(err))
}
// UPDATE A POST
function updatePost (req, res, next) {
  const post = req.body
  const id = req.params.id
  if (!post.text) {
    next(new Error('INVALID_POST'))
  }
  db('posts').where({ id }).then((post) => {
    if (!post.length > 0) {
      next(new Error(`CANT_FIND`))
    }
  })
  db('posts')
    .where('id', id)
    .update(post)
    .then((post) => {
      db('posts')
        .where({ id })
        .then((post) => res.status(200).json(post))
        .catch(next)
    })
    .catch(next)
}
// DELETE A POST
function deletePost (req, res, next) {
  const id = req.params.id
  db('posts')
    .where({ id })
    .then((post) => {
      if (!post.length > 0) {
        next(new Error(`CANT_FIND`))
      }
      db('posts')
        .where('id', id)
        .del()
        .then((post) => res.status(200).json({ mes: 'success! ' }))
        .catch(next)
    })
    .catch(next)
}
// GET ALL POST
server.get('/', getPosts)
// GET A POST BY ID
server.get('/:id', getPosts)
// NEW POST
server.post('/', newPost)
// UPDATE A POST
server.put('/:id', updatePost)
// DELETE A POST
server.delete('/:id', deletePost)
module.exports = server
