const express = require('express')
const db = require('../data/db')
const router = express.Router()


// Posts Get
router.get('/', (req, res) => {
    db('posts').then(post => {
        res.status(200).json(post)
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    db('posts').where({id: Number(id)}).then(post => {
        res.status(200).json(post)
    }).catch(err => {
        res.status(500).json(err)
    })
})

// Posts Post
router.post('/', (req, res) => {
    const { userId, text } = req.body
    db('posts').insert({userId, text}).then(post => {
        res.status(201).json(post)
    }).catch(err => {
        res.status(500).json(err)
    })
})

// Posts Update
router.put('/:id', (req, res) => {
    const { text } = req.body
    const { id } = req.params
    db('posts').where({id}).update({text}).then(post => {
        res.status(201).json(post)
    }).catch(err => {
        res.status(500).json(err)
    })
})

// Post Delete
router.delete('/:id', (req, res) => {
    const { id } = req.params
    db('posts').where({id}).del().then(post => {
        res.status(200).json(post)
    }).catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router;