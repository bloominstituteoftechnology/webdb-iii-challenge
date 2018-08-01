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

router.get('/:id', async (req, res) => {
  try {
    const tag = await db('Tags').where('id', req.params.id);
    if (tag.length === 0) {
      return res.status(404).json({ message: "Tag does not exist." });
    } else {
      return res.status(200).json(tag[0]);
    }
  } catch (error) {
    res.status(500).json({ message: "Tag count not be retrieved." });
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

router.put('/:id', async (req, res) => {
  if (req.body.tag.length > 16){
    return res.status(400).json({ message: "Tag must be less than 16 characters."});
  }
  try {
    const editedTag = await db('Tags').where('id', req.params.id).update(req.body);
    if (editedTag === 0) {
      return res.status(404).json({ message: "Tag does not exist." });
    } else {
      return res.status(200).json({ message: "Tag edited." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Tag could not be edited." });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await db('Tags').where('id', req.params.id).del();
    if (deletedTag === 0) {
      return res.status(404).json({ message: "Tag does not exist." });
    } else {
      return res.status(200).json({ message: "Tag deleted." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Tag could not be deleted." });
  }
});

module.exports = router;
