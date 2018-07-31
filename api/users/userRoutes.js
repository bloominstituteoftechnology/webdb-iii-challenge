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
        next({ code: 500, error: "There was an error while saving the user to the database." });
    }
})

router.get('/', async (req, res, next) => {
    try {
        const response = await db('users');
        return res.status(200).json(response);
    } catch (err) {
        next({ code: 500, error: "The users information could not be retrieved." });
    }
})

module.exports = router;