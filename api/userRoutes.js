const express = require('express');
const router = express.Router();
const db = require('../data/db.js');

router.get('/', async (req, res) => {
  try {
    const allUsers = await db('Users');
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json({ message: "Users could not be retrieved." });
  }
});

router.post('/', async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ message: "Please enter a name." });
  }
  if (!req.body.name.length > 128) {
    return res.status(400).json({ message: "Name must be less 128 characters." });
  }
  try {
    const newUser = await db('Users').insert(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: "User could not be added." })
  }
});

module.exports = router;
