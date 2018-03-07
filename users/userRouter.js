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

userRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  db
    .getUserById(id)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ error: `Error retrieving user with ID ${id}.` });
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

userRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  db
    .deleteUserById(id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `User ${id} deleted successfully.`});
      } else {
        res.status(404).json({ message: `User with ID ${id} not found.` });
      }
    })
    .catch(error => {
      res.status(404).json({ error: `The user with ID ${id} does not exist.` });
    });
});

module.exports = userRouter;