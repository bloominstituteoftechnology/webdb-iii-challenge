const express = require('express');
const router = express.Router();
const db = require('../data/db.js');

function userCheck(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ message: "Name cannot be blank." });
  }
  if (req.body.name.length > 128) {
    return res.status(400).json({ message: "Name must be less 128 characters." });
  }
  next();
}

router.get('/', async (req, res) => {
  try {
    const allUsers = await db('Users');
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json({ message: "Users could not be retrieved." });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await db('Users').where('id', req.params.id);
    if (user.length === 0) {
      return res.status(404).json({ message: "User does not exist."});
    }
    return res.status(200).json(user[0]);
  } catch (error) {
    return res.status(500).json({ message: "User could not be retrieved." });
  }
});

router.get('/:id/posts', async (req, res) => {
  try {
    const userPosts = await db('Posts').where('id', req.params.id);
    if (userPosts.length === 0) {
      return res.status(404).json({ message: "User either has no posts or does not exist."});
    }
    return res.status(200).json(userPosts);
  } catch (error) {
    return res.status(500).json({ message: "User's posts could not be retrieved." });
  }
});

router.post('/', userCheck, async (req, res) => {
  try {
    const newUser = await db('Users').insert(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: "User could not be added." })
  }
});

router.put('/:id', userCheck, async (req, res) => {
  try {
    const editedUser = await db('Users').where('id', req.params.id).update(req.body);
    if (editedUser === 0) {
      return res.status(404).json({ message: "User does not exist." });
    } else {
      return res.status(200).json({ message: "User edited." });
    }
  } catch (error) {
    return res.status(500).json({ message: "User could not be edited." });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await db('Users').where('id', req.params.id).del();
    if (deletedUser === 0) {
      return res.status(404).json({ message: "User does not exist." });
    } else {
      return res.status(200).json({ message: "User deleted." });
    }
  } catch (error) {
    return res.status(500).json({ message: "User could not be deleted." });
  }
});

module.exports = router;
