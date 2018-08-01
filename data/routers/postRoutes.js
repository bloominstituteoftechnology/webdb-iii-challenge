const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
    db('posts')
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => res.status(500).send(err.message))
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db('posts')
        .where({ id: Number(id) })
        .then(post => {
            if (!post.length) { throw new Error("Id not found") }
            res.status(200).json(post)
        })
        .catch(err => res.status(501).send(err.message))
})

router.post('/', (req, res) => {
    const post = req.body;
    db
        .insert(post)
        .into('posts')
        .then(ids => {
            const id = ids[0];
            res.status(200).json({ id, ...post })
        })
        .catch(err => res.status(501).json(err.message))
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const post = req.body
    db('posts')
        .where({ id: Number(id) })
        .update(post)
        .then(data => {
            if (!data) { throw new Error('Id not found') }
            res.status(200).json(post)
        })
        .catch(err => res.status(501).json(err.message))
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db('posts')
        .where({ id: Number(id) })
        .del()
        .then(data => {
            if (!data) { throw new Error('Id not found') }
            res.status(200).json(`${data} deleted`)
        })
        .catch(err => res.status(501).json(err.message))
})

module.exports = router;