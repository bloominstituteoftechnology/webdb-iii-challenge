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

const port = 5000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
