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


server.listen(8000, () => console.log('Running on port 8000'));