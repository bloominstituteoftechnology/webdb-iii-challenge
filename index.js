const express = require('express');

const db =require('./data/dbConfig');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('up and running...');
});

SVGPreserveAspectRatio.get('/users', (req, res) => {
    db('users')
    .then(users => {
        res.status(200).json(users);
    })
    .catch(() => {
        res,status(500).json({ message: "something didn't work"})
    })
});

server.get('/posts', (req, res) => {
    db('posts')
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(() => {
        res.status(500).json({ message: "error"})
    })
});

const port = 5000;
server.listen(port, function() {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});