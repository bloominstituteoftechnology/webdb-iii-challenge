const express = require('express');
const db = require('../data/db');
const router = express.Router();

router.get('/', (req, res) => {
    db('tags').then(tag => {
        res.status(200).json(tag)
    }).catch(err  => {
        res.status(400).json(err)
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    db('tags').where({id: Number(id)}).then(id => {
        res.status(200).json(id)
    }).catch(err => {
        res.status(400).json(err)
    })
})

router.post('/', (req, res) => {
    const { tag } = req.body
    db('tags').insert({tag}).then(tag => {
        res.status(200).json(tag)
    }).catch(err => {
        res.status(400).json(err)
    })
})

router.put('/:id', (req, res) => {
    const { tag } = req.body
    const { id } = req.params
    db('tags').where({id}).update({tag}).then(tag => {
        res.status(200).json(tag)
    }).catch(err => {
        res.status(400).json(err)
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    db('tags').where({id}).del().then(tag => {
        res.status(200).json(tag)
    }).catch(err => {
        res.status(400).json(err)
    })
})

module.exports = router;