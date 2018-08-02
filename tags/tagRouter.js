const express = require('express');
const router = express.Router();
const tagDb = require('../data/helpers/tagModel');

// tags
router.get('/', async (req, res) => {
    try {
        const tags = await tagDb.get();

        res.status(200).json(tags);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const tag = await tagDb.get(id);

        res.status(200).json(tag);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newTag = { ...req.body };
        const tag = await tagDb.insert(newTag);

        res.status(200).json(tag);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const changes = { ...req.body };
        const tag = await tagDb.update(id, changes);

        res.status(200).json(tag);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const tag = await tagDb.remove(id);

        res.status(200).json(tag);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
