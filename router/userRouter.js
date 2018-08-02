const express = require('express');
const db = require('../data/db');
const router = express.Router();


router.get('/', (req, res) => {
    db('users').then(user => {
        res.status(200).json(user)
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    db('users').where({id: Number(id)}).then(id => {
        res.status(200).json(id)
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.get('/:id/posts', (req, res) => {
    const { id } = req.params
    db('posts').where({UserId: Number(id)}).then(user => {
        res.status(200).json(user)
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.post('/', (req,res) => {
    const { name } = req.body
    if(!name) {
        res.status(404).json({error: "Didn't provide a name"})
    } else if (name.length > 128) {
        res.status(411).json({error: "Exceeded character limit"})
    }
    db('users').insert({name}).then(user => {
        res.status(201).json(user)
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.put('/:id', (req, res) => {
  const { name } = req.body
  const { id } = req.params
  db('users').where({id}).update({name}).then(user => {
      res.status(201).json(user)
  }).catch(err => {
      res.status(500).json(err)
  })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    db('users').where({id}).delete().then(user => {
        res.status(200).json(user)
    }).catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router;