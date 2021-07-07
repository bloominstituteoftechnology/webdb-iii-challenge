const express = require('express');
const db = require('../data/db');

const router = express.Router();

router.use(express.json());

//USERS CRUD START
router.get('/', async (req, res) => {
  try {
    const users = await db('Users');
    res.status(200).json(users);
  } catch(err) {
    res.status(500).send(`You done goofed with ${err}`);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await db('Users').where('id', req.params.id);
    res.status(200).json(user);
  } catch(err) {
    res.status(500).send(`You done goofed with ${err}`);
  }
});

router.get('/:id/posts', async (req, res) => {
  try {
    const user = await db('posts as p').join('Users as u', 'u.id', 'p.userId').select('p.id', 'p.text', 'u.name as postedBy').where('p.userId', req.params.id);
    res.status(200).json(user);
  } catch(err) {
    res.status(500).send(`You done goofed with ${err}`);
  }
});

router.post('/', async (req,  res) => {
  const name = req.body;
  try {
    const ids = await db.insert(name).into('users');
    const id = ids[0];
    res.status(201).json({id, ...name});
  } catch(err) {
    res.status(500).send(`Ya done goofed with ${err}`);
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const result = await db('Users').where('id', req.params.id).del();
    res.status(200).json(result);
  } catch(err) {
    res.status(500).send(`Try again and ${err}`);
  }
})

router.put('/:id', async (req, res) => {
  const name = req.body;
  try {
    const index = await db('users').where('id', req.params.id).update(name);
    if (index > 0) return res.status(200).json(await db('Users').where('id', req.params.id).first()); //any point to this .first()?
    res.status(200).send("If didn't trigger");
  } catch(err) {
    res.status(500).send(`Try again and ${err}`);
  }
})

router.use((err, req, res, next) => {
  //You could put some user notes here
  switch(err.code) {
    case 404:
      res.status(err.code).send({
        success: false,
        statusCode: err.code,
        description: err.userMessage
      });
      break;
    case 500:
      res.status(err.code).send({
        success: false,
        statusCode: err.code,
        description: err.userMessage,
        compilerMessage: err.compilerMessage
      })
    default:
      res.status(500).send({
        success: false,
        title: err.message,
        description: err.consoleLog
      });
      break;
  }
})

module.exports = router;
