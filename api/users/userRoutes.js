const express = require('express');
const errorHandler = require('../errors');
const db = require('../../data/db');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const response = await db('users');
        return res.status(200).json(response);
    } catch (err) {
        next({ code: 500, error: 'The users information could not be retrieved.' });
    }
})

router.use(errorHandler);

module.exports = router;