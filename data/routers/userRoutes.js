const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res, next) => {
    db('users')
        .then(posts => { res.status(200).json(posts) })
        .catch(err => next({ code: 500, message: err.message }))
})

router.get('/:id/posts', (req, res, next) => {
    const userId = req.params.id;

    db
        .select('*')
        .from('posts')
        .leftJoin('users', 'posts.userId', 'users.id')
        .where({ 'userId': userId })
        .then(post => {
            if (!post) { throw new Error('No posts found') }
            else { res.status(200).json(post) }
        })
        .catch(err => next({ code: 500, message: err.message }))
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;

    db('users')
        .where({ id: Number(id) })
        .then(posts => {
            if (posts.length === 0) { throw new Error('id not found') }
            else { res.status(200).json(posts) }
        })
        .catch(err => next({ code: 500, message: err.message }))
})

router.post('/', (req, res, next) => {
    const user = req.body;

    db
        .insert(user)
        .into('users')
        .then(ids => {
            const id = ids[0];
            res.status(200).json({ id, ...user })
        })
        .catch(err => next({ code: 501, message: err.message }))
})

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;

    await db('users')
        .where({ id: Number(id) })
        .del()
        .then(data => {
            if (!data) { throw new Error('Id not found') }
            else { res.status(200).json(`${data} deleted`) }
        })
        .catch(err => next({ code: 501, message: err.message }))
})

router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const user = req.body

    db('users')
        .where({ id: Number(id) })
        .update(user)
        .then(data => {
            if (data === 1) {
                res.status(200).send('updated')
            } else {
                res.status(400).json({ message: 'User with that ID not found' })
            }
        })
        .catch(err => next({ code: 501, message: err.message }))
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