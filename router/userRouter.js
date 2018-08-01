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
    const id = req.params.id
    db('users').where({id: Number(id)}).then(id => {
        res.status(200).json(id)
    }).catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router;