const express = require('express');
const db = require('../data/db');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const response = await(db('Users').select());
        res.status(200).json(response);
    } catch(error) {
        next(sendError(500, 'Failed to get users information.', error.message))
    }
})

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        const response = await(db('Users').where({id: Number(id)}));
        if (response.length === 0) {
            return next(sendError(404, 'Failed to retrieve user information', 'The user for this specific id does not exist.'))
        }
        res.status(200).json(response[0]);
    } catch(error) {
        next(sendError(500, 'Failed to get user information.', error.message))
    }
})

router.post('/', async (req, res, next) => {
    if (!req.body.name) {
        return next(sendError(400, 'Failed to add user to database.', 'Please provide user name.'))
    }

    const newUser = req.body;

    try {
        const response = await (db('Users').insert(newUser));
        const id = response[0];
        res.status(201).json({id, ...newUser});
    } catch(error) {
        next(sendError(500, 'Failed to add user to database.', error.message))
    }
})

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        const user = await(db('Users').select().where('id', Number(id)));
        const response = await(db('Users').where('id', id).del());
        if (response === 0) {
            return next(sendError(404, 'Failed to remove user.', 'The user for this specific id does not exist.'))
        }
        res.status(200).json(user[0]);
    } catch(error) {
        next(sendError(500, 'Failed to remove user.', error.message))
    }
})

router.put('/:id', async (req, res, next) => {
    if (!req.body.name) {
        return next(sendError(400, 'Failed to update user.', 'Please provide user name.'))
    }
    
    const id = req.params.id;
    const changes = req.body;
    
    try {
        const response = await(db('Users').where('id', id).update(changes));
        const user = await(db('Users').where('id', Number(id)));
        if (response === 0) {
            return next(sendError(404, 'Failed to update user', 'The user for this specific id does not exist.'))
        }
        res.status(200).json(user);
    } catch(error) {
        next(sendError(500, 'Failed to update user.', error.message))
    }
})

router.get('/:id/posts', async (req, res, next) => {
    const id = req.params.id;

    try {
        const response = await(db('Posts').where({userid: Number(id)}));
        if (response.length === 0) {
            return next(sendError(404, 'Failed to retrieve posts for this user', 'The user for this specific id does not exists or there is no post by this user.'))
        }
        res.status(200).json(response);
    } catch(error) {
        next(sendError(500, 'Failed to retrieve posts for this user.', error.message))
    }
})

module.exports = router;