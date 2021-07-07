const express = require('express');
const db = require('../data/db');
const router = express.Router();

router.get('/', (req, res) => {
  db('posts')
    .then( post => {res.status(200).json(post)})
    .catch(err => res.status(500).json(err))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  db('posts')
    .where({id})
    .then( post => {
      if (post.length > 0){res.status(200).json(post)
      } else {res.status(400).json({err: 'Unable to find post ID.'})}  
      })
      .catch(err => res.status(500).json(err))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const body= req.body
  db('posts')
    .where({id})
    .update(body)
    .then(post => {
      if (post === 1){res.status(200).json({ message: 'Post updated!'})}
        else {res.status(400).json({err: 'Post not found!'})}})
      .catch(err => res.status(500).json(err))
})


router.post('/', (req, res) => {
  const post = req.body
  db
    .insert(post)
    .into('posts')
    .then( data => {
      if (data.length === 1){res.status(201).json({message: 'Post added'})}
    })
    .catch(err => res.status(500).json(err))
})

router.delete('/:id', (req,res) => {
  const id = req.params.id
  db('posts')
    .where({id})
    .delete()
    .then( data => {
      if (data === 1){res.status(201).json({message: `1 post deleted`})
      } else {res.status(400).json({message: 'post with that ID not found'})}
    })
    .catch(err => res.status(500).json(err))
})

module.exports = router;