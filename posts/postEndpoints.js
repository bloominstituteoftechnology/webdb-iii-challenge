const express = require('express');

const posts = require('./postsController');

const postsRouter = express.Router();

postsRouter.post('/', function(req, res) {
  const post = req.body;

  posts
    .insert(post)
    .then(function(id) {
      res.status(201).json(id);
    })
    .catch(function(err) {
      res.status(500).json({ error });
    });
});

postsRouter.get('/', function(req, res) {
  posts
    .get()
    .then(function(posts) {
      res.status(200).json(posts);
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
});

postsRouter.get('/:id', function(req, res) {
  const { id } = req.params;

  posts
    .get(id)
    .then(function(post) {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json(null);
      }
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
});

postsRouter.get('/:id/tags', function(req, res) {
  const { id } = req.params;

  posts
    .getPostTags(id)
    .then(function(tags) {
      res.status(200).json(tags);
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
});

postsRouter.put('/:id', function(req, res) {
  const { id } = req.params;

  posts
    .update(id, req.body)
    .then(function(count) {
      if (count > 0) {
        res.status(200).json({ updated: count });
      } else {
        res.status(404).json(null);
      }
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
});

postsRouter.delete('/:id', function(req, res) {
  const { id } = req.params;

  posts
    .remove(id)
    .then(function(count) {
      res.status(200).json({ count });
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
});

module.exports = postsRouter;