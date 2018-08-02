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
    .catch(err => res.status(500).json(err, 'USER DEL'))
})
server.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const name = req.body;
  if (!name) {
    res.status(400).json({ errorMessage: "Please provide name for the user." })
  }
  db('users')
    .where('id', id)
    .update(name)
    .then(response => {
      if (!response) {
        res.status(404).json({ message: "The action with the specified ID does not exist." })
      } else {
        res.status(200).json({ response });
      }
    })
    .catch(err => res.status(500).json(err, 'USER PUT'))
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
    .catch(err => res.status(500).json(err, 'POST DEL'))
})
server.put('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = req.body;
  if (!post) {
    res.status(400).json({ errorMessage: "Please provide content for the post." })
  }
  db('posts')
    .where('id', id)
    .update(post)
    .then(response => {
      if (!response) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      } else {
        res.status(200).json({ response });
      }
    })
    .catch(err => res.status(500).json(err, 'POSTS PUT'))
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
    .catch(err => res.status(500).json(err, 'TAG DEL'))
})
server.put('/tags/:id', (req, res) => {
  const id = req.params.id;
  const tag = req.body;
  if (!tag) {
    res.status(400).json({ errorMessage: "Please provide content for the tag." })
  }
  db('tags')
    .where('id', id)
    .update(tag)
    .then(response => {
      if (!response) {
        res.status(404).json({ message: "The tag with the specified ID does not exist." })
      } else {
        res.status(200).json({ response });
      }
    })
    .catch(err => res.status(500).json(err, 'TAGS PUT'))
})

server.listen(8000, () => console.log('API is running on port 8000'));