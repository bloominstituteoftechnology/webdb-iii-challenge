const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
    db('tags')
        .then(tags => res.status(200).json(tags))
        .catch(err => res.status(500).json(err.message))
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db('tags')
        .where({ id: Number(id) })
        .then(tag => {
            if (!tag) { throw new Error('Id not found') }
            res.status(200).json(tag);
        })
        .catch(err => res.send(500).json(err.message))
})

router.post('/', (req, res) => {
    const tag = req.body;
    db
        .insert(tag)
        .into('tags')
        .then(ids => {
            const id = ids[0];
            res.status(200).json({ id, ...tag })
        })
        .catch(err => res.status(501).json(err.message))
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const tag = req.body;

    db('tags')
        .where({ id: Number(id) })
        .update(tag)
        .then(data => {
            if (!data) { throw new Error('Id not found') }
            res.status(200).json(tag)
        })
        .catch(err => res.status(501).json(err.message))
})

router.delete('/:id',(req,res) => {
    const id = req.params.id;

    db('tags')
    .where({id: Number(id)})
    .del()
    .then(data => {
        if(!data){throw new Error('Id not found')}
        res.status(200).json(`${data} entries deleted`)
    })
    .catch(err => res.status(501).json(err.message))
})

module.exports = router;