const express = require('express');

const db = require('./userController.js');

const userRouter = express.Router();

userRouter.post('/', function (req, res) {
  const user = req.body;
  db
    .addUser(user)
    .then(function (id) {
      res.status(201).json({ id });
    })
    .catch(function (err) {
      res.status(500).json({ msg: 'Error Adding User' });
    });
});

userRouter.get('/', function (req, res) {
  db
    .getAll()
    .then(function (users) {
      res.status(200).json(users);
    })
    .catch(function (err) {
      res.status(500).json({ msg: 'Error retrieving Users' });
    });
});

userRouter.get('/:id', function (req, res) {
  const { id } = req.params;

  db
    .getById(id)
    .then(function (users) {
      if (users.length > 0) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ msg: `User with ${id} does not exist` });
      }
    })
    .catch(function (err) {
      res.status(500).json({ msg: 'Error retrieving Users' });
    });
});

userRouter.get('/:id/posts', (req, res) => {
  const { id } = req.params;
  db
    .getPostsByID(id)
    .then(posts => {
      if (users.length > 0) {
        res.status(200).json(posts)
      } else {
        res.status(404).json({ msg: `User ID: ${id} not found.` })
      }
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error getting back user posts' });
    })
});

userRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;
  db
    .update(id, user)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ msg: 'Updated Successfully' })
      } else {
        res.status(404).json({ msg: 'This is the Phantom Zone, no users exist here!' })
      }
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error updating user' })
    })
});

userRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  db
    .nuke(id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ msg: 'Delete Successful' })
      } else {
        res.status(404).json({ msg: 'User does not exist' })
      }
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error nuking zoos' })
    })
})

module.exports = userRouter;