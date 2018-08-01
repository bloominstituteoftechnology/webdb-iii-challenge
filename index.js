const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json())

server.get('/users', (req, res) => {
    db('users').then(user => {
        res.status(200).json(user)
    }).catch(err => {
        res.status(500).json(err)
    })
})

server.get('/users/:id', (req, res) => {
    const id = req.params.id
    db('users').where({id: Number(id)}).then(id => {
        res.status(200).json(id)
    }).catch(err => {
        res.status(500).json(err)
    })
})

server.listen(8000, () => {
    console.log('=====API=========')
})