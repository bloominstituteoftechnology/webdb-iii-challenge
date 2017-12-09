const express = require('express');

const repository = require('./UsersRepository');

const UserRouter = express.Router();

UserRouter.get('/', function(req, res) {
  repository
    .get()
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not retrieve the users' });
    });
});

UserRouter.get('/:id', function(req, res) {
  const { id } = req.params;

  repository
    .get(id)
    .then(function(record) {
      if (record) {
        res.status(200).json(record);
      } else {
        res.status(404).json(null);
      }
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not retrieve the user' });
    });
});

UserRouter.get('/:id/posts', function(req, res) {
  const { id } = req.params;

  repository
    .get(id)
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not retrieve the posts' });
    });
});

UserRouter.put('/:id', function(req, res) {
  const { id } = req.params;

  repository
    .update(id, req.body)
    .then(function(count) {
      if (count > 0) {
        res.status(200).json({ updated: count });
      } else {
        res.status(404).json(null);
      }
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not update the user' });
    });
});

UserRouter.post('/', function(req, res) {
  const { user } = req.body;

  repository
    .insert(user)
    .then(function(ids) {
      res.status(200).json(ids);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not create the users' });
    });
});

UserRouter.delete('/users/:id', function(req, res) {
  const { id } = req.params;

  repository
    .delete(id)
    .then(function(record) {
      res.status(200).json(record);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not delete the user' });
    });
});

module.exports = UserRouter;
