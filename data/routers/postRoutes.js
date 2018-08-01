const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res, next) => {
    db('posts')
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => next({ code: 500, message: err.message }))
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    db('posts')
        .where({ id: Number(id) })
        .then(post => {
            if (!post.length) { throw new Error("Id not found") }
            res.status(200).json(post)
        })
        .catch(err => next({ code: 501, message: err.message }))
})

router.post('/', (req, res, next) => {
    const post = req.body;
    db
        .insert(post)
        .into('posts')
        .then(ids => {
            const id = ids[0];
            res.status(200).json({ id, ...post })
        })
        .catch(err => next({ code: 501, message: err.message }))
})

router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const post = req.body
    db('posts')
        .where({ id: Number(id) })
        .update(post)
        .then(data => {
            if (!data) { throw new Error('Id not found') }
            res.status(200).json(post)
        })
        .catch(err => next({ code: 501, message: err.message }))
})

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    db('posts')
        .where({ id: Number(id) })
        .del()
        .then(data => {
            if (!data) { throw new Error('Id not found') }
            res.status(200).json(`${data} deleted`)
        })
        .catch(err => next({ code: 502, message: err.message }))
})

router.use((err, req, res, next) => {
    switch (err.code) {
        case 500:
            res.status(500).send({
                success: false,
                data: undefined,
                title: 'Failed Get',
                description: err.message,
                recovery: 'Please check database'
            })
            break;
        case 501:
            res.status(501).send({
                success: false,
                data: undefined,
                title: 'Bad database modification',
                description: err.message,
                recovery: 'Please check inputs'
            })
            break;
        case 502:
            res.status(502).send({
                success: false,
                data: undefined,
                title: 'Removed Failed',
                description: err.message,
                recovery: 'Please check inputs'
            })
            break;
        default:
            res.status(404).send({ message: 'Something bad happened' })
    }
})
module.exports = router;