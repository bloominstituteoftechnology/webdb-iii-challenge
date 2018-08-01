const express = require('express')
const db = require('../data/db')
const router = express.Router()

router.get('/', (req, res) => {
    db('posts').then(post => {
        res.status(200).json(post)
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    db('posts').where({id: Number(id)}).then(post => {
        res.status(200).json(post)
    }).catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router