const express = require('express');
const db = require('../data/db');

const router = express.Router();

function sendError(code, message, error) {
    return {
        code: code,
        message: message,
        error: error
    }
}

router.get('/', async (req, res, next) => {
    try {
        const response = await (db('Tags').select());
        res.status(200).json(response);
    } catch (error) {
        next(sendError(500, 'Failed to get tags information.', error.message))
    }
})

router.get('/:id', async (req, res, next) => {
    const id = Number(req.params.id);

    try {
        const response = await (db('Tags').where({ id }));

        if (response.length === 0) {
            return next(sendError(404, 'Failed to retrieve tags information', 'The tag for this specific id does not exist.'))
        }

        res.status(200).json(response);
    } catch (error) {
        next(sendError(500, 'Failed to get tag information.', error.message))
    }
})

router.post('/', async (req, res, next) => {
    if (!req.body.tag) {
        return next(sendError(400, 'Failed to save tag to database.', 'Please provide tag name.'))
    }

    try {
        const response = await (db('Tags').insert(req.body));
        const id = response[0];
        const newTag = await (db('Tags').where({ id }));
        res.status(200).json(newTag);
    } catch (error) {
        next(sendError(500, 'Failed to save tag to database.', error.message))
    }
})

router.delete('/:id', async (req, res, next) => {
    const id = Number(req.params.id);

    try {
        const tag = await (db('Tags').where({ id }));
        if (!tag) {
            return next(sendError(404, 'Failed to remove tag.', 'The tag for this specific id does not exist.'))
        }

        await (db('Tags').where({ id }).del());
        res.status(200).json(tag);
    } catch (errore) {
        next(sendError(500, 'Failed to remove tag.', error.message))
    }
})

router.put('/:id', async (req, res, next) => {
    if (!req.body.tag) {
        return next(sendError(400, 'Failed to save tag to database.', 'Please provide tag name.'))
    }

    const id = Number(req.params.id);
    const changes = req.body;
    try {
        const response = await (db('Tags').where({ id }).update(changes));
        if (!response) {
            return next(sendError(404, 'Failed to update tag.', 'The tag for this specific id does not exist.'))
        } else {
            const newTag = await db('Tags').where({ id });
            res.status(200).json(newTag);
        }
    } catch (error) {
        next(sendError(500, 'Failed to update tag.', error.message))
    }
})

module.exports = router;