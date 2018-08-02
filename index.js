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
  const id = req.params.id;
  db('users')
    .where('id', id)
    .then(response => {
      if (response.length === 0) {
        res.status(404).json('The user with the specified ID does not exist.')
      } res.status(200).json(response)
    })
    .catch(err => res.status(500).json(err, 'USER GET:ID'))
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
server.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  db('users')
    .where('id', id)
    .del()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => res.status(500).json(err ,'USER DEL'))
})

// Posts
server.get('/posts', (req, res) => {
  db('posts')
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json({ error: "Posts .get catch error" }))
})
server.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  db('posts')
    .where('id', id)
    .then(response => {
      if (response.length === 0) {
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
server.delete('/posts/:id', (req, res) => {
  const id = req.params.id;
  db('posts')
    .where('id', id)
    .del()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => res.status(500).json(err ,'POST DEL'))
})

// Tags
server.get('/tags', (req, res) => {
  db('tags')
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json({ error: "Tags .get catch error" }))
})
server.get('/tags/:id', (req, res) => {
  const id = req.params.id;
  db('tags')
    .where('id', id)
    .then(response => {
      if (response.length == 0) {
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
server.delete('/tags/:id', (req, res) => {
  const id = req.params.id;
  db('tags')
    .where('id', id)
    .del()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => res.status(500).json(err ,'TAG DEL'))
})

server.listen(8000, () => console.log('API is running on port 8000'));