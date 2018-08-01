const express = require('express')

const router = express.Router()

const db = require('../data/helpers/tagDb')

router.get('/', (req, res) => {
  db
    .get()
    .then(tags => res.status(200).json(tags))
    .catch(err => res.status(500).json(err))
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  db
    .get(id)
    .then(tag => {
      if (tag === undefined) {
        res.status(400).json({ error: `Tag with id ${id} not found.` })
      } else {
        res.status(200).json(tag)
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.post('/', (req, res) => {
  const tag = req.body

  if (tag.tag === undefined || typeof tag.tag !== 'string' || tag.tag.length > 16) {
    res.status(400).json({ error: 'Post text (string, max=16) field is required.' })
  }
  db
    .insert(tag)
    .then(newID => {
      db
        .get(newID.id)
        .then(newTag => {
          res.status(201).json(newTag)
        })
        .catch(err => res.status(500).json({ error: 'Added post could not be retrieved.' }))
    })
    .catch(err => res.status(500).json({ error: 'Post could not be added to database.' }))
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const tag = req.body

  if (tag.tag === undefined || typeof tag.tag !== 'string') res.status(400).json({ error: 'Tag (string) field is required.' })
  db
    .update(id, tag)
    .then(count => {
      db.get(id).then(newTag => res.status(200).json(newTag)).catch(error => console.error(error))
    })
    .catch(error => res.status(500).json({ error: `post with id ${id} could not be updated.` }))
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  db
    .remove(id)
    .then(deletions => {
      if (deletions === 1) {
        res.status(200).json({ success: `post with id ${id} was deleted.` })
      } else {
        res.status(404).json({ error: `post with id ${id} was not found.` })
      }
    })
    .catch(error => res.status(500).json({ error: `post with id ${id} could not be deleted.` }))
})

module.exports = router
