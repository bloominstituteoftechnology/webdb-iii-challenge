const express = require('express');

const db = require('./userController.js');

const userRouter = express.Router();

userRouter.get('/', function(req, res) {
  db
    .getAll()
    .then(function(users) {
      res.status(200).json(users);
    })
    .catch(function(err) {
      res.status(500).json({ msg: 'Error retrieving Users' });
    });
});

userRouter.get('/:id', function(req, res) {
  const { id } = req.params;

  db
    .getById(id)
    .then(function(users) {
      if (users.length > 0) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ msg: `User with ${id} does not exist` });
      }
    })
    .catch(function(err) {
      res.status(500).json({ msg: 'Error retrieving Users' });
    });
});

userRouter.post('/', function(req, res) {
  const user = req.body;
  db
    .addUser(user)
    .then(function(ids) {
      res.status(201).json(ids);
    })
    .catch(function(err) {
      res.status(500).json({ msg: 'Error Adding User' });
    });
});

// userRouter.get('/:id/posts', function(req, res) {

// })
