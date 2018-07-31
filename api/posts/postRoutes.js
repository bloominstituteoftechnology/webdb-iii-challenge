const express = require('express');
const db = require('../../data/db');
const { postCheck } = require('../../middleware/required');

const router = express.Router();

router.post('/', postCheck, async (req, res, next) => {
    const { userId, text } = req.body;
    const post = { userId, text };
    try {
        const response = await db('posts').insert(post);
        return res.status(201).json(response);
    } catch (err) {
        return next({ code: 500, error: "There was an error while saving the post to the database." });
    }
})

router.get('/', async (req, res, next) => {
    try {
        const response = await db('posts');
        return res.status(200).json(response);
    } catch (err) {
        return next({ code: 500, error: "The posts information could not be retrieved." });
    }
})

module.exports = router;