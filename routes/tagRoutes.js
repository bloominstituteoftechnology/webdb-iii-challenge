const express = require('express');
const db = require('../data/db');
const router = express.Router();

router.get('/', (req, res) => {
  db('tags')
    .then(tag => {res.status(200).json(tag)})
    .catch(err => res.status(500).json(err))
})

router.get('/:id', (req,res) => {
  const id = req.params.id
  db('tags')
    .where({id})
    .then( tag => {
      if (tag.length > 0){res.status(200).json(tag)
      } else{res.status(400).json({err: 'Tag not found.'})}})
      .catch(err => res.status(500).json(err))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const tag = req.body
  if (!tag.tag) {res.status(400).json({err: 'Tag required!'})
  } else {
    db('tags')
      .where({id})
      .update(tag)
      .then( tag => {
        if (tag === 1){res.status(200).json({message: 'Tag updated!'})}
          else {res.status(400).json({message: 'Tag not found!'})}})
        .catch(err => res.status(500).json(err))
  }
})


router.post('/', (req, res) => {
  const tag = req.body
  if (!tag.tag) {res.status(400).json({err: 'Tag required!'})
  } else {
    db
      .insert(tag)
      .into('tags')
      .then( data => {
        if (data.length === 1){res.status(201).json({message: 'Tag added!'})}
      })
      .catch(err => res.status(500).json(err))
  }
})

router.delete('/:id', (req,res) => {
  const id = req.params.id
  db('tags')
    .where({id})
    .delete()
    .then( data => {
      if (data === 1){res.status(201).json({message: 'Tag deleted!'})
      } else {res.status(400).json({message: 'Tag not found!'})}
    })
    .catch(err => res.status(500).json(err))
})

module.exports = router;