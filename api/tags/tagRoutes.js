const express = require('express');
const db = require('../../data/db');
const { tagCheck } = require('../../middleware/required');

const router = express.Router();

router.post('/', tagCheck, async (req, res, next) => {
    const { tag } = req.body;
    console.log(tag);
    try {
        const response = await db('tags').insert({ tag });
        return res.status(201).json(response);
    } catch (err) {
        return next({ code: 500, error: 'The tags information could not be retrieved.' });
    }
})

router.get('/', async (req, res, next) => {
    try {
        const response = await db('tags');
        return res.status(200).json(response);
    } catch (err) {
        return next({ code: 500, error: 'The tags information could not be retrieved.' });
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const response = await db('tags').where('id', Number(req.params.id)).first();
        if (!response) return next({ code: 404, message: "The tag with the specified ID does not exist." });
        return res.status(200).json(response);
    } catch (err) {
        return next({ code: 500, error: "The tag information could not be retrieved." });
    }
})

module.exports = router;