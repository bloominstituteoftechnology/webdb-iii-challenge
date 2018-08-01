const server = require('express')()
const db = require('../../data/dbConfig')
// GET ALL TAGS
function getTags (req, res, next) {
  const { id } = req.params
  if (id) {
    db('tags')
      .where({ id })
      .then((tag) => {
        if (!tag.length > 0) {
          next(new Error(`CANT_FIND`))
        }
        res.status(200).json(tag)
      })
      .catch((err) => res.status(500).send(err))
  } else {
    db('tags')
      .then((tags) => res.status(200).json(tags))
      .catch((err) => res.status(500).send(err))
  }
}
// ADD NEW TAG
function tagTag (req, res, next) {
  const tag = req.body
  if (!tag || tag.tag.length > 80) {
    next(new Error('INVALID_TAG'))
  }
  db('tags')
    .insert(tag)
    .then((tag) => {
      const id = tag[0]
      db('tags')
        .where({ id })
        .then((tags) => res.status(201).json(tags))
        .catch((err) => res.status(500).json(err))
    })
    .catch((err) => res.status(500).send(err))
}
// UPDATE A TAG
function updateTag (req, res, next) {
  const updatedTag = req.body
  const id = req.params.id
  if (!updatedTag || updatedTag.tag.length > 80) {
    next(new Error('INVALID_TAG'))
  }
  db('tags').where({ id }).then((tag) => {
    if (!tag.length > 0) {
      next(new Error(`CANT_FIND`))
    }
    db('tags')
      .where('id', id)
      .update(updatedTag)
      .then((tag) => {
        db('tags')
          .where({ id })
          .then((tag) => res.status(200).json(tag))
          .catch((err) => res.status(500).json(err))
      })
      .catch((err) => res.status(500).send(err))
  })
}
// DELETE TAG
function deleteTag (req, res, next) {
  const id = req.params.id
  db('tags').where({ id }).then((tag) => {
    if (!tag.length > 0) {
      next(new Error(`CANT_FIND`))
    }
    db('tags')
      .where('id', id)
      .del()
      .then((tag) => res.status(200).json({ mes: 'success! ' }))
  })
}
// GET ALL TAGS
server.get('/', getTags)
// GET A TAG BY ID
server.get('/:id', getTags)
// ADD NEW TAG
server.post('/', tagTag)
// UPDATE TAG
server.put('/:id', updateTag)
// DELETE TAG
server.delete('/:id', deleteTag)
module.exports = server
