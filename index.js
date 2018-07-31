const express = require('express');
const db = require('./data/db');
const server = express();

const port = 3300;

server.use(express.json());

server.get('/', (req, res) => {
    res.send('server is running');
});

// **** users *****

server.get('/users', (req, res) => {
    db('users').then(u => {
        res.status(200).json(u);
    }).catch(err => {
        res.status(500).json(err);
    })
})

server.post('/users', (req, res) => {
    const info = req.body;
    db.insert(info).into('users')
    .then(ids => {
        const id = ids[0]
        res.status(201).json({ id, ...info});
    }).catch(err => {
        res.status(500).json(err)
    })
})

// **** posts *****
server.get('/posts', (req, res) => {
    db('Posts').then(post => {
        res.status(200).json(post);
    }).catch(err => {
        res.status(500).json(err);
    })
})

server.post('/posts', (req, res) => {
    const info = req.body;
    db.insert(info).into('posts')
    .then(ids => {
        const id = ids[0]
        res.status(201).json({ id, ...info});
    }).catch(err => {
        res.status(500).json(err)
    })
})

server.listen(port, () => { console.log(`Server is listening on port ${port}`)})