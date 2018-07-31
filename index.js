const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

// endpoints here

server.get('/', (req, res) => {
    res.send('up and running...')
})

server.get('/users', (req, res) => {
    db('users')
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => res.status(500).json(err));
})

server.get('/posts', (req, res) => {
    db('posts')
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => res.status(500).json(err));
})

server.get('/tags', (req, res) => {
    db('tags')
        .then(tags => {
            res.status(200).json(tags);
        })
        .catch(err => res.status(500).json(err));
})

const port = 3333;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});