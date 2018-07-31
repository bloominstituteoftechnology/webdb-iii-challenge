const express = require("express");

const db = require("./data/db");

const server = express();

server.use(express.json());

// endpoints here

// GET users, posts, tags

server.get("/", (req, res) => {
    res.send("up and running...");
});

server.get("/users", (req, res) => {
    db("users")
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => res.status(500).json(err));
});

server.get("/posts", (req, res) => {
    db("posts")
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => res.status(500).json(err));
});

server.get("/tags", (req, res) => {
    db("tags")
        .then(tags => {
            res.status(200).json(tags);
        })
        .catch(err => res.status(500).json(err));
});

// GET users, posts, tags by id

server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    db('users').where({id: Number(id)})
    .then(response => {
        res.status(200).json(response);
    }).catch(err => res.status(500).json(err));
})

server.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    db('posts').where({id: Number(id)})
    .then(response => {
        res.status(200).json(response);
    }).catch(err => res.status(500).json(err));
})

server.get('/tags/:id', (req, res) => {
    const { id } = req.params;
    db('tags').where({id: Number(id)})
    .then(response => {
        res.status(200).json(response);
    }).catch(err => res.status(500).json(err));
})

// POST users, posts, tags

server.post("/users", (req, res) => {
    const user = req.body;
    const { name } = user;

    db.insert(user)
        .into("users")
        .then(ids => {
            const id = ids[0];
            res.status(201).json({ id, ...user });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.post("/posts", (req, res) => {
    const post = req.body;
    const { text, userId  } = post;

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

server.post("/tags", (req, res) => {
    const tag = req.body;
    // const { tag } = tag;
    // Suggestions to change this ^? 

    db.insert(tag)
        .into("tags")
        .then(ids => {
            const id = ids[0];
            res.status(201).json({ id, ...tag });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// DELETE users, posts, tags

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db('users').where({id: Number(id)})
    .delete()
    .then(response => {
        res.status(200).json(response);
    }).catch(err => res.status(500).json(err));
})

server.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    db('posts').where({id: Number(id)})
    .delete()
    .then(response => {
        res.status(200).json(response);
    }).catch(err => res.status(500).json(err));
})

server.delete('/tags/:id', (req, res) => {
    const { id } = req.params;
    db('tags').where({id: Number(id)})
    .delete()
    .then(response => {
        res.status(200).json(response);
    }).catch(err => res.status(500).json(err));
})

const port = 3333;
server.listen(port, function () {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
