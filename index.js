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

server.get('/users/:id/posts', (req, res) => {
  const { userId } = req.params;
  db('posts as p')
    .join('users as u', 'u.id', 'p.userId')
    .select('p.id', 'p.text', 'u.name')
    .where('p.userId', userId)
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

server.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  db('posts')
    .where({ id })
    .del()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => res.status(500).json(err));
});

server.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const post = req.body;
  db('posts')
    .where({ id })
    .update(post)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => res.status(500).json(err));
});

server.get('/tags', (req, res) => {
  db('tags')
    .then((tags) => {
      res.status(200).json(tags);
    })
    .catch((err) => res.status(500).json(err));
});

server.get('/tags/:id', (req, res) => {
  const { id } = req.params;
  db('tags')
    .where({ id })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => res.status(500).json(err));
});

server.post('/tags', (req, res) => {
  const tag = req.body;
  db.insert(tag)
    .into('tags')
    .then((ids) => {
      const id = ids[0];
      res.status(201).json({ id, ...tag });
    })
    .catch((err) => res.status(500).json(err));
});

server.delete('/tags/:id', (req, res) => {
  const { id } = req.params;
  db('tags')
    .where({ id })
    .del()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => res.status(500).json(err));
});

server.put('/tags/:id', (req, res) => {
  const { id } = req.params;
  const tag = req.body;
  db('tags')
    .where({ id })
    .update(tag)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => res.status(500).json(err));
});
const port = 5000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
