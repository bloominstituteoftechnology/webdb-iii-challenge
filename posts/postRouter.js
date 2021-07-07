const express = require('express');
const router = express.Router();
const postDb = require('../data/helpers/postModel');

// posts
router.get('/', async (req, res) => {
    try {
        const posts = await postDb.get();

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postDb.get(id);

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newPost = { ...req.body };
        const post = await postDb.insert(newPost);

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const changes = { ...req.body };
        const post = await postDb.update(id, changes);

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postDb.remove(id);

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
