const express = require('express');

const repository = require('./PostsRepository');

const PostsRouter = express.Router();

PostsRouter.get('/', function(req, res) {
  repository
    .get()
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not retrieve the Posts' });
    });
});

PostsRouter.get('/:id', function(req, res) {
  const { id } = req.params;

  repository
    .get(id)
    .then(function(record) {
      if (record){
        res.status(200).json(record)
      } else {
        res.status(404).json(null);
      }
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not retrieve the Post' });
    });
});

PostsRouter.get('/:id/tags', function(req, res) {
  const { id } = req.params;

  repository
    .get(id)
    .then(function(recors) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status.json({ error: 'Could not retrieve the Post Tags' });
    });
});

PostsRouter.post('/', function(req, res) {
  const { post } = req.body;

  repository
    .insert(post)
    .then(function(ids) {
      res.status(200).json(ids);
    })
    .catch(function(err) {
      res.status(500),json({ error: 'Could not create the posts' });
    });
});

module.exports = PostsRouter;