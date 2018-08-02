const express = require('express');
const db = require('../data/db');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const response = await(db('Posts').select());
        res.status(200).json(response);
    } catch(error) {
        next(sendError(500, 'Failed to get posts information.', error.message))
    }
})

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const getPostQuery = db('Posts as p').select('p.id', 'u.name as username', 'p.text', 'p.createdAt')
                                         .leftJoin('Users as u', 'p.userid', 'u.id')
                                         .where('p.id', '=', Number(id));
    
    const getTagQuery = db('Posts as p').select('t.tag')
                                       .join('PostTags as pt', 'p.id', 'pt.postid')
                                       .join('Tags as t', 't.id', 'pt.tagid')
                                       .where('p.id', '=', Number(id));

    try {
        const postRes = await(getPostQuery);
        const tagRes = await(getTagQuery);
        if (postRes.length === 0) {
            return next(sendError(404, 'Failed to retrieve post information', 'The post for this specific id does not exist.'))
        }

        let post = postRes[0];
        post.tag = tagRes.length > 0 ?
                   tagRes.map(tag => tag.tag) : []

        res.status(200).json(post);
    } catch(error) {
        next(sendError(500, 'Failed to get post information.', error.message))
    }
})

router.post('/', async (req, res, next) => {
    if (!(req.body.text && req.body.userid)) {
        return next(sendError(400, 'Failed to add post to database.', 'Please provide userid and text for post.'))
    }

    try {
        const response = await (db('Posts').insert(req.body));
        const id = response[0];
        const newPost = await(db('Posts').where({ id }));
        res.status(201).json(newPost[0]);
    } catch (error) {
        next(sendError(500, 'Failed to add post to database.', error.message))
    }
})

router.delete('/:id', async (req, res, next) => {
    const id = Number(req.params.id);

    try {
        const post = await(db('Posts').where({ id }));
        const response = await(db('Posts').where({ id }).del());
        if (response === 0) {
            return next(sendError(404, 'Failed to remove post.', 'The post for this specific id does not exist.'))
        }
        res.status(200).json(post[0]);
    } catch(error) {
        next(sendError(500, 'Failed to remove post.', error.message))
    }
})

router.put('/:id', async (req, res, next) => {
    if ((!req.body.text && !req.body.userid)) {
        return next(sendError(400, 'Failed to update post.', 'Please provide userid and text for post.'))
    }
    
    const id = Number(req.params.id);
    const changes = req.body;
    console.log(changes);
    try {
        const response = await(db('Posts').where({ id }).update(changes));
        const post = await(db('Posts').where({ id }));
        if (!response) {
            return next(sendError(404, 'Failed to update post', 'The post for this specific id does not exist.'))
        }
        res.status(200).json(post);
    } catch(error) {
        next(sendError(500, 'Failed to update post.', error.message))
    }
})

module.exports = router;