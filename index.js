const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('up and running...');
});

server.get('/users', (req, res) => {
  db('users')
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
})

server.get('users/:id', (req, res) => {
  const { id } = req.params;
  db('users').where('id', id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(200).json(response);
    })
});

server.post('/users', (req, res) => {
  const user = req.body;
  db.insert(user).into('users')
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});