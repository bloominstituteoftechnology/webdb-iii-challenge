const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res, next) => {
    db('tags')
        .then(tags => res.status(200).json(tags))
        .catch(err => next({ code: 500, message: err.message }))
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    db('tags')
        .where({ id: Number(id) })
        .then(tag => {
            if (!tag.length) { throw new Error('Id not found') }
            res.status(200).json(tag);
        })
        .catch(err => next({ code: 500, message: err.message }))
})

router.post('/', (req, res, next) => {
    const tag = req.body;
    db
        .insert(tag)
        .into('tags')
        .then(ids => {
            const id = ids[0];
            res.status(200).json({ id, ...tag })
        })
        .catch(err => next({ code: 501, message: err.message }))
})

router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const tag = req.body;

    db('tags')
        .where({ id: Number(id) })
        .update(tag)
        .then(data => {
            if (!data) { throw new Error('Id not found') }
            else { res.status(200).json(tag) }
        })
        .catch(err => next({ code: 501, message: err.message }))
})

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    db('tags')
        .where({ id: Number(id) })
        .del()
        .then(data => {
            if (!data) { throw new Error('Id not found') }
            else { res.status(200).json(`${data} entries deleted`) }
        })
        .catch(err => next({ code: 502, message: err.message }))
})

router.use((err, req, res, next) => {
    switch (err.code) {
        case 500:
            res.status(500).json({
                success: false,
                data: undefined,
                title: 'Failed Get',
                description: err.message,
                recovery: 'Please check database'
            })
            break;
        case 501:
            res.status(501).json({
                success: false,
                data: undefined,
                title: 'Bad database modification',
                description: err.message,
                recovery: 'Please check inputs'
            })
            break;
        case 502:
            res.status(502).json({
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