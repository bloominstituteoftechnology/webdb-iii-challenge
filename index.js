const express = require('express');
const db = require('./data/db.js');

const server = express();

server.use(express.json());

//USERS CRUD START
server.get('/users', async (req, res) => {
  try {
    const users = await db('Users');
    res.status(200).json(users);
  } catch(err) {
    res.status(500).send(`You done goofed with ${err}`);
  }
});

server.post('/users', async (req,  res) => {
  const name = req.body;
  try {
    const ids = await db.insert(name).into('users');
    const id = ids[0];
    res.status(201).json({id, ...name});
  } catch(err) {
    res.status(500).send(`Ya done goofed with ${err}`);
  }
})

server.delete('/users/:id', async (req, res) => {
  try {
    const result = await db('Users').where('id', req.params.id).del();
    res.status(200).json(result);
  } catch(err) {
    res.status(500).send(`Try again and ${err}`);
  }
})

server.put('/users/:id', async (req, res) => {
  const name = req.body;
  try {
    const index = await db('users').where('id', req.params.id).update(name);
    if (index > 0) return res.status(200).json(await db('Users').where('id', req.params.id).first()); //any point to this .first()?
    res.status(200).send("If didn't trigger");
  } catch(err) {
    res.status(500).send(`Try again and ${err}`);
  }
})
//USERS CRUD END

//POSTS CRUD START
server.get('/posts', async (req, res) => {
  try {
    const posts = await db('posts');
    res.status(200).json(posts);
  } catch(err) {
    res.status(500).send(`You done goofed with ${err}`);
  }
});

server.post('/posts', async (req,  res) => {
  const {userId, text} = req.body;
  try {
    const ids = await db.insert({userId, text}).into('posts');
    const id = ids[0];
    res.status(201).json(await db('posts').where('id', id));
  } catch(err) {
    res.status(500).send(`Ya done goofed with ${err}`);
  }
})

server.delete('/posts/:id', async (req, res) => {
  try {
    const result = await db('posts').where('id', req.params.id).del();
    res.status(200).json(result);
  } catch(err) {
    res.status(500).send(`Try again and ${err}`);
  }
})

server.put('/posts/:id', async (req, res) => {
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

//TAGS CRUD START
server.get('/tags', async (req, res) => {
  try {
    const tags = await db('tags');
    res.status(200).json(tags);
  } catch(err) {
    res.status(500).send(`You done goofed with ${err}`);
  }
});

server.post('/tags', async (req,  res) => {
  const tag = req.body;
  try {
    const ids = await db.insert(tag).into('tags');
    const id = ids[0];
    res.status(201).json({id, ...tag});
  } catch(err) {
    res.status(500).send(`Ya done goofed with ${err}`);
  }
})

server.delete('/tags/:id', async (req, res) => {
  try {
    const result = await db('tags').where('id', req.params.id).del();
    res.status(200).json(result);
  } catch(err) {
    res.status(500).send(`Try again and ${err}`);
  }
})

server.put('/tags/:id', async (req, res) => {
  const tag = req.body;
  try {
    const index = await db('tags').where('id', req.params.id).update(tag);
    if (index > 0) return res.status(200).json(await db('tags').where('id', req.params.id));
    res.status(200).send("If didn't trigger");
  } catch(err) {
    res.status(500).send(`Try again and ${err}`);
  }
})
//TAGS CRUD END
const port = 3000;
server.listen(port, () => {console.log(`Server is listening on port ${port}`)})
