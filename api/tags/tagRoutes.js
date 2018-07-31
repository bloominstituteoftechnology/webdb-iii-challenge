const express = require('express');
const db = require('../../data/db');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const response = await db('tags');
        return res.status(200).json(response);
    } catch (err) {
        return next({ code: 500, error: 'The tags information could not be retrieved.' });
    }
})

module.exports = router;