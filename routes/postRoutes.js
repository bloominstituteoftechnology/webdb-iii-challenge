const express = require('express');
const server = express.Router();
const db = require('../data/db');

server.get("/", (req, res) => {
    db("posts")
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => res.status(500).json(err));
});

server.get("/:id", (req, res) => {
    const { id } = req.params;
    db("posts")
        .where({ id: Number(id) })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => res.status(500).json(err));
});

server.post("/", (req, res) => {
    const post = req.body;
    const { text, userId } = post;

    db.insert(post)
        .into("posts")
        .then(ids => {
            const id = ids[0];
            res.status(201).json({ id, ...post });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.delete("/:id", (req, res) => {
    const { id } = req.params;
    db("posts")
        .where({ id: Number(id) })
        .delete()
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => res.status(500).json(err));
});

server.put("/:id", (req, res) => {
    const id = req.params.id;
    const { text, userId } = req.body;
    if (!text || !userId) res.status(400).json({ err });
    else {
        db("posts")
            .where({ id: Number(id) })
            .update({ text, userId })
            .then(post => {
                if (post > 0) res.status(200).json(post);
                else res.status(400).json({ err });
            })
            .catch(err => res.status(500).json(err));
    }
});

module.exports = server;