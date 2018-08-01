const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

// endpoints here
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

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on port ${port} ===\n`);
});