const express = require('express');

const db = require('./userController.js');

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  db
    .getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving the users.' });
    });
});

userRouter.post('/', (req, res) => {
  const user = req.body;

  db
    .postUser(user)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving the posts.' });
    });
});

module.exports = userRouter;