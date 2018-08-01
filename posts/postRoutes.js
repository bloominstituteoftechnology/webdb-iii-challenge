const express = require('express');
const db = require('../data/db');

const router = express.Router();

router.use(express.json());

//POSTS CRUD START
router.get('/', async (req, res) => {
  try {
    const posts = await db('posts');
    res.status(200).json(posts);
  } catch(err) {
    res.status(500).send(`You done goofed with ${err}`);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await db('posts').where('id', req.params.id);
    res.status(200).json(post);
  } catch(err) {
    res.status(500).send(`You done goofed with ${err}`);
  }
});

router.post('/', async (req,  res) => {
  const {userId, text} = req.body;
  try {
    const ids = await db.insert({userId, text}).into('posts');
    const id = ids[0];
    res.status(201).json(await db('posts').where('id', id));
  } catch(err) {
    res.status(500).send(`Ya done goofed with ${err}`);
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const result = await db('posts').where('id', req.params.id).del();
    res.status(200).json(result);
  } catch(err) {
    res.status(500).send(`Try again and ${err}`);
  }
})

router.put('/:id', async (req, res) => {
  const {userId, text} = req.body;
  try {
    const index = await db('posts').where('id', req.params.id).update({userId, text});
    if (index > 0) return res.status(200).json(await db('posts').where('id', req.params.id)); //any point to this .first()?
    res.status(200).send("It didn't trigger");
  } catch(err) {
    res.status(500).send(`Try again and ${err}`);
  }
})
//POSTS CRUD END
module.exports = router;
