const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/users', (req, res) => {
  db('users')
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.status(500).json(err));
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  db('users')
    .where({ id })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => res.status(500).json(err));
});

server.post('/users', (req, res) => {
  const user = req.body;
  db.insert(user)
    .into('users')
    .then((ids) => {
      const id = ids[0];
      res.status(201).json({ id, ...user });
    })
    .catch((err) => res.status(500).json(err));
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  db('users')
    .where({ id })
    .del()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => res.status(500).json(err));
});

server.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;
  db('users')
    .where({ id })
    .update(user)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => res.status(500).json(err));
});

server.get('/posts', (req, res) => {
  db('posts')
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => res.status(500).json(err));
});

server.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  db('posts')
    .where({ id })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => res.status(500).json(err));
});

server.post('/posts', (req, res) => {
  const post = req.body;
  db.insert(post)
    .into('posts')
    .then((ids) => {
      const id = ids[0];
      res.status(201).json({ id, ...post });
    })
    .catch((err) => res.status(500).json(err));
});

const port = 5000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
