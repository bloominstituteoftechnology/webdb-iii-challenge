const express = require('express');
const router = express.Router();
const db = require('../data/db.js');

router.get('/', async (req, res) => {
  try {
    const allPosts = await db('Posts');
    return res.status(200).json(allPosts);
  } catch (error) {
    return res.status(500).json({ message: "Posts could not be retrieved." });
  }
});

router.post('/', async (req, res) => {
  if (!req.body.text) {
    res.status(400).json({ message: "Text cannot be blank." });
  }
  try {
    const newPost = await db('Posts').insert(req.body);
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ message: "Post could not be added." })
  }
});

module.exports = router;
