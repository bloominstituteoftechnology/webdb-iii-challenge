const express = require('express');

const db = require('./data/db')

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('up and running... 35')
});

server.get('/users', (req, res) => {
    db('users').then(user => {
        res.status(200).json(user)
    }).catch(err => res.status(500).json(err))
});

server.post('/users', (req, res) => {
    const user = req.body;

    db.insert(user).into('users').then(users =>{
        const id = users[0];
        res.status(201).json({id, ...user})
    }).catch(err => res.status(500).json(err))
})
server.get('/posts', (req, res) => {
    db('posts').then(pid => {
        res.status(200).json(pid)
    }).catch(err => res.status(500).json(err))
});

server.post('/posts', (req, res) => {
    const zoo = req.body;

    db.insert(zoo).into('posts').then(ids => {
        const id = ids[0];
        res.status(201).json({id, ...zoo})
    }).catch(err => res.status(500).json(err))
})

const port = 3500;
server.listen(port, function () {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});