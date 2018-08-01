const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

server.post('/users', (req, res) => {
    const user = req.body;
    db.insert(user)
        .into('Users')
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

server.get('/users', (req, res) => {
    db.select()
        .from('Users')
        .then(users => {
            res.status(201).json(users);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});


server.get('/users/:id', (req, res) => {
    const {id} = req.params;
    db('Users')
        .where({id})
        .then(users => {
            res.status(201).json(users);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});


server.post('/posts', (req, res) => {
    const post = req.body;
    db.insert(post)
        .into('Posts')
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

server.get('/posts', (req, res) => {
    db.select()
        .from('Posts')
        .then(posts => {
            res.status(201).json(posts);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});


server.get('/posts/:id', (req, res) => {
    const {id} = req.params;
    db('Posts')
        .where({id})
        .then(posts => {
            res.status(201).json(posts);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

server.listen(8000, () => console.log('Running on port 8000'));