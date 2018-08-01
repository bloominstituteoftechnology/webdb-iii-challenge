const codes = require("./../data/statusCodes");

const express = require('express');

const db = require('../data/dbConfig.js');
const router = express.Router();

router.get('/', (req, res, next) => {
    db('tags')
    .then(response => {
        res.status(codes.OK).json(response);
    })
    .catch(err => {
        next(err);
    })
})
router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    db('tags')
    .where('id', id)
    .then(response => {
        if(response.length === 0) {
            throw {code: codes.NOT_FOUND, message: 'Tag with that id does not exist'}
        }
        res.status(codes.OK).json(response);
    })
    .catch(err => {
        next(err);
    })
})

module.exports = router;
