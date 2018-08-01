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

router.post('/', (req,res, next) => {
    db('tags')
    .insert(req.body)
    .then(response => {
        res.status(codes.CREATED).json(response);
    })
    .catch(err => {
        next(err);
    })
})
router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    db('tags')
    .where('id', id)
    .del().then(response => {
        if(response === 0) {
            throw {code: codes.NOT_FOUND, message: 'Tag does not exist with that id'}
        }
        res.status(200).json(response);
    })
    .catch(err => {
        next(err);
    });
});
module.exports = router;
