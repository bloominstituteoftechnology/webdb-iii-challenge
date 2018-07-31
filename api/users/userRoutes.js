const express = require('express');
const errorHandler = require('../errors');
const db = require('../../data/db');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('users');
})

module.exports = router;