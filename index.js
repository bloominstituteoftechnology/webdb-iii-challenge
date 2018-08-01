const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const db = require('./data/db');
const userDb = require('./data/helpers/userModel');
const postDb = require('./data/helpers/postModel');
const tagDb = require('./data/helpers/tagModel');

const server = express();
server.use(cors());
server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.status(200).send(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

// posts
server.get('/posts', async (req, res) => {
    try {
        const posts = await postDb.get();
        res.status(200).json(posts);
    } catch(err) {
        res.status(500).json(err);
    }
});

server.get('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const post = await postDb.get(id);
        res.status(200).json(post);
    } catch(err) {
        res.status(500).json(err);
    }
});

// users
server.get('/users', async (req, res) => {
    try {
        const users = await userDb.get();
        res.status(200).json(users);
    } catch(err) {
        res.status(500).json(err);
    }
});

server.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const user = await userDb.get(id);
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json(err);
    }
});

server.post('/users', async (req, res) => {
    try {
        const newUser = {...req.body};
        const user = await userDb.insert(newUser);
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json(err);
    }
});

// tags
server.get('/tags', async (req, res) => {
    try {
        const tags = await tagDb.get();
        res.status(200).json(tags);
    } catch(err) {
        res.status(500).json(err);
    }
});

server.get('/tags/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const tag = await tagDb.get(id);
        res.status(200).json(tag);
    } catch(err) {
        res.status(500).json(err);
    }
});

server.use(function (req, res) {
    res.status(404).json({error: "Ain't nobody got time for that!"});
});

const port = 8000;
server.listen(port, function () {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
