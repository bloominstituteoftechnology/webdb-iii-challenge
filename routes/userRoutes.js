const express = require('express');
const server = express.Router();
const db = require('../data/db');

server.get('/', (req, res) => {
    db('users')
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => res.status(500).json(err));
});

server.get('/:id', (req, res) => {
    const { id } = req.params;
    db('users')
        .where({ id: Number(id) })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => res.status(500).json(err));
});

server.post('/', (req, res) => {
    const user = req.body;
    const { name } = user;

    db.insert(user)
        .into('users')
        .then(ids => {
            const id = ids[0];
            res.status(201).json({ id, ...user });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('users')
        .where({ id: Number(id) })
        .delete()
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => res.status(500).json(err));
});

server.put('/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body;
    if (!name) res.status(400).json({ err });
    else {
        db('users')
            .where({ id: Number(id) })
            .update(name)
            .then(user => {
                if (user > 0) res.status(200).json(user);
                else res.status(400).json({ err });
            })
            .catch(err => res.status(500).json(err));
    }
});

module.exports = server;
