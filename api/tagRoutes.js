const express = require('express');
const router = express.Router();
const db = require('../data/db.js');

router.get('/', async (req, res) => {
  try {
    const allTags = await db('Tags');
    return res.status(200).json(allTags);
  } catch (error) {
    return res.status(500).json({ message: "Tags could not be retrieved." });
  }
});

router.post('/', async (req, res) => {
  if (req.body.tag.length > 16){
    return res.status(400).json({ message: "Tag must be less than 16 characters."});
  }
  try {
    const newTag = await db('Tags').insert(req.body);
    return res.status(201).json(newTag);
  } catch (error) {
    return res.status(500).json({ message: "Tag could not be added." });
  }
});

module.exports = router;
