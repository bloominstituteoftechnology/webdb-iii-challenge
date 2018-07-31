const express = require('express');
const db = require('../../data/db');
const { userCheck } = require('../../middleware/required');

const router = express.Router();

router.post('/', userCheck, async (req, res, next) => {
    const { name } = req.body;
    try {
        const response = await db('users').insert({ name });
        return res.status(201).json(response);
    } catch (err) {
        return next({ code: 500, error: "There was an error while saving the user to the database." });
    }
})

router.get('/', async (req, res, next) => {
    try {
        const response = await db('users');
        return res.status(200).json(response);
    } catch (err) {
        return next({ code: 500, error: "The users information could not be retrieved." });
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const response = await db('users').where('id', Number(req.params.id)).first();
        if (!response) return next({ code: 404, message: "The user with the specified ID does not exist." });
        return res.status(200).json(response);
    } catch (err) {
        return next({ code: 500, error: 'The user information could not be retrieved.' });
    }
})

router.put('/:id', userCheck, async (req, res, next) => {
    const { name } = req.body;
    try {
        const response = await db('users').where('id', req.params.id).update({ name });
        if (response === 0) return next({ code: 404, message: 'The user with the specified ID does not exist.' });
        return res.status(200).json(response);
    } catch (err) {
        return next({ code: 500, error: "The users information could not be modified." });
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const response = await db('users').where('id', req.params.id).del();
        if (response === 0) return next({ code: 404, message: 'The user with the specified ID does not exist.' });
        return res.status(200).json(response);
    } catch (err) {
        return next({ code: 500, error: "The user could not be removed." });
    }
})

module.exports = router;