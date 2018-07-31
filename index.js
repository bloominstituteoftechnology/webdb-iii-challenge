const express = require('express');
const db = require('./data/db');

const server = express();
server.use(express.json());

// Users
server.get('/users', (req, res) => {
  db('users')
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json({ error: "Users .get catch error" }))
})
server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  db('users')
    .where('id', Number(id))
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => res.status(500).json({ error: "The user information could not be retrieved." }))
})
server.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name)
    res.status(400).json({ errorMessage: "Required fields" });
  db.insert({ name })
    .into("users")
    .then(user => res.status(201).json({ name }))
    .catch(err => res.status(400).json({ error: "Error posting" }))
})

// Posts
server.get('/posts', (req, res) => {
  db('posts')
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json({ error: "Posts .get catch error" }))
})
server.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  db('posts')
    .where('id', Number(id))
    .then(response => {
      if (!response) {
        res.status(400).json({ message: "The user with the ID does not exist." })
      } res.status(200).json(response)
    })
    .catch(err => res.status(500).json({ error: "The user information could not be retrieved." }))
})
server.post('/posts', (req, res) => {
  const post = req.body;
  db.insert(post)
    .into("posts")
    .then(user => res.status(201).json(post))
    .catch(err => res.status(400).json({ error: "Error posting" }))
})

// Tags
server.get('/tags', (req, res) => {
  db('tags')
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json({ error: "Tags .get catch error" }))
})
server.get('/tags/:id', (req, res) => {
  const { id } = req.params;
  db('tags')
    .where('id', Number(id))
    .then(response => {
      if (!response) {
        res.status(400).json({ message: "The tag with the ID does not exist." })
      } res.status(200).json(response)
    })
    .catch(err => res.status(500).json({ error: "The user information could not be retrieved." }))
})
server.post('/tags', (req, res) => {
  const tag = req.body;
  db.insert(tag)
    .into("tags")
    .then(user => res.status(201).json(tag))
    .catch(err => res.status(400).json({ error: "Error posting" }))
})

server.listen(8000, () => console.log('API is running on port 8000'));