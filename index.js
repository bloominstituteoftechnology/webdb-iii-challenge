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

server.get('/posts', async (req, res) => {
    // db('Posts').then(posts => {
    //     if (posts.length === 0) res.status(404).json({ error: 'There are no posts.' });
    //     res.status(200).json(posts)
    // })
    //     .catch(err => res.status(500).json(err));
    
    try {
        const posts = await postDb.get();
        res.status(200).json(posts);
    } catch(err) {
        res.status(500).json(err);
    }
});

server.get('/users', async (req, res) => {
    // db('Users').then(users => {
    //     if (users.length === 0) res.status(404).json({ error: 'There are no users.' });
    //     res.status(200).json(users)
    // })
    //     .catch(err => res.status(500).json(err));

    try {
        const users = await userDb.get();
        res.status(200).json(users);
    } catch(err) {
        res.status(500).json(err);
    }
});

server.get('/tags', async (req, res) => {
    // db('Tags').then(tags => {
    //     if (tags.length === 0) res.status(404).json({ error: 'There are no tags.' });
    //     res.status(200).json(tags)
    // })
    //     .catch(err => res.status(500).json(err));

    try {
        const tags = await tagDb.get();
        res.status(200).json(tags);
    } catch(err) {
        res.status(500).json(err);
    }
});

server.post('/users', (req, res) => {
    const user = req.body;
    db.insert(user).into('Users').then(ids => {
        if(user.name === "") res.status(400).json({error: 'Missing name'});
        const id = ids[0];
        res.status(200).json({id, ...user});
    }).catch(err => res.status(500).json({error: err}));
});

const port = 8000;
server.listen(port, function () {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
