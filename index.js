const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

// ! ====== Users
// TODO get all posts by user id
server.get('/', (req, res) => {
  res.send('up and running...');
});

server.get('/users', (req, res) => {
  db('Users')
    .then(user => {
      res.status(200).json(user);
    })
    .catch((err) => res.status(500).json(err));
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  db('Users')
    .where({ id })
    .then(users => {
      res.status(200).json(users);
    })
    .catch((err) => res.status(500).json(err));
});

server.post('/users', (req, res) => {
  const user = req.body;
  db
    .insert(user)
    .into('Users')
    .then(ids => {
      const id = ids[0]
      res.status(201).json({ id, ...user})
    })
    .catch(err => res.status(500).json(err));
});

server.delete('/users/:id', (req, res) => {
  const {id} = req.params;
  console.log(id)
  db('Users')
    .where({ id })
    .del()
    .then(user => {
      res.status(200).json(user);
    })
    .catch((err) => res.status(500).json(err));
});

server.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  db('Users')
    .where({ id })
    .update({ name })
    .then(user => {
      res.status(200).json(user);
    })
    .catch((err) => res.status(500).json(err));
});

//! ============ Tags

server.get('/tags', (req, res) => {
  db('Tags')
    .then(tag => {
      res.status(200).json(tag);
    })
    .catch((err) => res.status(500).json(err));
});

server.get('/tags/:id', (req, res) => {
  const { id } = req.params;
  db('Tags')
    .where({ id })
    .then(tags => {
      res.status(200).json(tags);
    })
    .catch((err) => res.status(500).json(err));
});

server.post('/tags', (req, res) => {
  const tag = req.body;
  db
    .insert(tag)
    .into('Tags')
    .then(ids => {
      const id = ids[0]
      res.status(201).json({ id, ...tag})
    })
    .catch(err => res.status(500).json(err));
});

server.delete('/tags/:id', (req, res) => {
  const {id} = req.params;
  console.log(id)
  db('Tags')
    .where({ id })
    .del()
    .then(tag=> {
      res.status(200).json(tag);
    })
    .catch((err) => res.status(500).json(err));
});

server.put('/tags/:id', (req, res) => {
  const { id } = req.params;
  const { tag } = req.body;
  db('Tags')
    .where({ id })
    .update({ tag })
    .then(tag => {
      res.status(200).json(tag);
    })
    .catch((err) => res.status(500).json(err));
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on port ${port} ===\n`);
});