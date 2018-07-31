const codes = require("./../data/statusCodes");

const express = require('express');

const db = require('../data/dbConfig.js');
const router = express.Router();

router.get('/', (req, res, next) => {
    db('posts')
    .then(response => {
        res.status(codes.OK).json(response);
    })
    .catch(err => {
        next(err);
    })
})
router.post('/', (req,res, next) => {
    db('posts')
    .insert(req.body)
    .then(response => {
        res.status(codes.CREATED).json(response);
    })
    .catch(err => {
        next(err);
    })
})
module.exports = router;