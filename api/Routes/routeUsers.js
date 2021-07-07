const server = require('express')()
const db = require('../../data/dbConfig')
// GET ALL USERS ||
function getUsers (req, res, next) {
  const { id } = req.params
  if (id) {
    db('users')
      .where({ id })
      .then((user) => {
        if (!user.length > 0) {
          next(new Error(`CANT_FIND`))
        }
        res.status(200).json(user)
      })
      .catch(next)
  } else {
    db('users').then((users) => res.status(200).json(users)).catch(next)
  }
}
// POST NEW USER
function postUser (req, res, next) {
  const user = req.body
  if (!user.name || user.name.length > 128) {
    next(new Error('INVALID_USER'))
  }
  db
    .insert(user)
    .into('users')
    .then((users) => {
      const id = users[0]
      db('users')
        .where('id', id)
        .then((user) => res.status(201).json(user))
        .catch(next)
    })
    .catch(next)
}
// UPDATE A USER
function updateUser (req, res, next) {
  const user = req.body
  const id = req.params.id
  if (!user.name || user.name.length > 120) {
    next(new Error('INVALID_USER'))
  }
  db('users')
    .where('id', id)
    .update(user)
    .then((users) => {
      return users
    })
    .catch((err) => res.status(500).send(err))
  db('users')
    .where('id', id)
    .then((user) => {
      if (user.length == 0) {
        next(new Error('CANT_FIND'))
      }
      res.status(201).json(user)
    })
    .catch(next)
}
// DELETE A USER
function deleteUser (req, res, next) {
  const id = req.params.id
  db('users').where({ id }).then((user) => {
    if (!user.length > 0) {
      next(new Error(`CANT_FIND`))
    }
  })
  db('users').where('id', id).del().then((user) => {
    res.status(200).json({ mes: 'Success !' })
  })
}
function getUserPosts (req, res, next) {
  const userID = req.params.id
  db('posts as p')
    .join('users as u', 'u.id', 'p.userID')
    .select('p.id', 'p.text', 'u.name as postedBy')
    .where('p.userId', userID)
    .then((posts) => {
      console.log(posts.length)
      if (posts.length === 0) {
        next(new Error(`CANT_FIND`))
      }
      res.status(200).json(posts)
    })
    .catch((err) => res.status(500).send(err))
}
// GET ALL USERS
server.get('/', getUsers)
// GET USER BY ID
server.get('/:id', getUsers)
// POST NEW USER
server.post('/', postUser)
// UPDATE A USER
server.put('/:id', updateUser)
// DELETE A USER
server.delete('/:id', deleteUser)
// GET ALL USER POST
server.get('/:id/posts', getUserPosts)
module.exports = server
