const express = require('express');

const tags = require('./tagsController');

const tagsRouter = express.Router();

tagsRouter.post('/', function(req, res) {
  const tag = req.body;

  tags
    .insert(tag)
    .then(function(id) {
      res.status(201).json(id);
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
});

tagsRouter.get('/', function(req, res) {
  tags
    .get()
    .then(function(tags) {
      res.status(200).json(tags);
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
});

tagsRouter.get('/:id', function(req, res) {
  const { id } = req.params;

  tags
    .get(id)
    .then(function(tag) {
      if (tag) {
        res.status(200).json(tag);
      } else {
        res.status(404).json(null);
      }
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
});

tagsRouter.put('/:id', function(req, res) {
  const { id } = req.params;

  tags
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

tagsRouter.delete('/:id', function(req, res) {
  const { id } = req.params;

  tags
    .remove(id)
    .then(function(count) {
      res.status(200).json({ count });
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
});

module.exports = tagsRouter;
