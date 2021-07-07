const express = require('express');
const db = require('../data/db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tags = await db('tags');
    res.status(200).json(tags);
  } catch(err) {
    res.status(500).send(`You done goofed with ${err}`);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await db('tags').where('id', req.params.id);
    res.status(200).json(tag);
  } catch(err) {
    res.status(500).send(`You done goofed with ${err}`);
  }
});

router.post('/', async (req,  res) => {
  const tag = req.body;
  try {
    const ids = await db.insert(tag).into('tags');
    const id = ids[0];
    res.status(201).json({id, ...tag});
  } catch(err) {
    res.status(500).send(`Ya done goofed with ${err}`);
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const result = await db('tags').where('id', req.params.id).del();
    res.status(200).json(result);
  } catch(err) {
    res.status(500).send(`Try again and ${err}`);
  }
})

router.put('/:id', async (req, res) => {
  const tag = req.body;
  try {
    const index = await db('tags').where('id', req.params.id).update(tag);
    if (index > 0) return res.status(200).json(await db('tags').where('id', req.params.id));
    res.status(200).send("If didn't trigger");
  } catch(err) {
    res.status(500).send(`Try again and ${err}`);
  }
})

module.exports = router;
