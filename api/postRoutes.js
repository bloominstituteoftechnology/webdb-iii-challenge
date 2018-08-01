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

router.get('/:id', async (req, res) => {
  try {
    const post = await db('Posts').where('id', req.params.id);
    if (post.length === 0) {
      return res.status(404).json({ message: "Post does not exist."});
    }
    return res.status(200).json(post[0]);
  } catch (error) {
    return res.status(500).json({ message: "Post could not be retrieved." });
  }
});

router.post('/', async (req, res) => {
  if (!req.body.userId) {
    return res.status(400).json({ message: "User Id required." });
  }
  if (!req.body.text) {
    return res.status(400).json({ message: "Text cannot be blank." });
  }
  try {
    const newPost = await db('Posts').insert(req.body);
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ message: "Post could not be added." })
  }
});

router.put('/:id', async (req, res) => {
  if (!req.body.userId) {
    return res.status(400).json({ message: "User Id required." });
  }
  if (!req.body.text) {
    return res.status(400).json({ message: "Text cannot be blank." });
  }
  try {
    const editedPost = await db('Posts').where('id', req.params.id).update(req.body);
    if (editedPost === 0) {
      return res.status(404).json({ message: "Post does not exist." });
    } else {
      return res.status(200).json({ message: "Post edited." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Post could not be edited." });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await db('Posts').where('id', req.params.id).del();
    if (deletedPost === 0) {
      return res.status(404).json({ message: "Post does not exist." });
    } else {
      return res.status(200).json({ message: "Post deleted." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Post could not be deleted." });
  }
});

module.exports = router;
