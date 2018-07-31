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
router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    db('posts')
    .where('id', id)
    .then(response => {
        if(response.length === 0) {
            throw {code: codes.NOT_FOUND, message: 'Post with that id does not exist'}
        }
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