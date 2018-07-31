const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
    db('users')
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => res.status(500).json(err))
})
router.get('/:id', (req, res) => {
    const id = req.params.id;

    db('users')
        .where({ id: Number(id) })
        .then(posts => {
            if (posts.length === 0) { throw new Error('id not found') }
            res.status(200).json(posts)
        })
        .catch(err => res.status(500).json(err.message))
})

router.post('/', (req, res) => {
    const user = req.body;

    db
        .insert(user)
        .into('users')
        .then(ids => {
            const id = ids[0];
            res.status(200).json({ id, ...user })
        })
        .catch(err => res.status(500).json(err))
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

        await db('users')
        .where({ id: Number(id) })
        .del()
        .then(
            res.status(200).send(`User ${id} deleted`))
        .catch(err => res.status(501).json(err))
})

module.exports = router;