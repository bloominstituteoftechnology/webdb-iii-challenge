const express = require('express');

const db = require('./postController.js');

const postRouter = express.Router();

postRouter.get('/', (req, res) => {
  db
    .getPosts()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving the posts.' });
    });
});

postRouter.post('/', (req, res) => {
  const post = req.body;

  db
    .postPost(post)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error posting the post.' });
    });
});

module.exports = postRouter;