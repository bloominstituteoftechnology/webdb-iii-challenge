const express = require("express");

const db = require("./data/db");

const server = express();

server.use(express.json());

const apiRouter = require('./routes/apiRouter');
server.use('/', apiRouter);

// endpoints here

server.get("/", (req, res) => {
    res.send("up and running...");
});


// GET, GET by ID, POST, DELETE and PUT posts

server.get("/posts", (req, res) => {
    db("posts")
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => res.status(500).json(err));
});

server.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    db("posts")
        .where({ id: Number(id) })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => res.status(500).json(err));
});

server.post("/posts", (req, res) => {
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

server.delete("/posts/:id", (req, res) => {
    const { id } = req.params;
    db("posts")
        .where({ id: Number(id) })
        .delete()
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => res.status(500).json(err));
});

server.put("/posts/:id", (req, res) => {
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

// GET, GET by ID, POST, DELETE and PUT tags

server.get("/tags", (req, res) => {
    db("tags")
        .then(tags => {
            res.status(200).json(tags);
        })
        .catch(err => res.status(500).json(err));
});

server.get("/tags/:id", (req, res) => {
    const { id } = req.params;
    db("tags")
        .where({ id: Number(id) })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => res.status(500).json(err));
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

server.delete("/tags/:id", (req, res) => {
    const { id } = req.params;
    db("tags")
        .where({ id: Number(id) })
        .delete()
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => res.status(500).json(err));
});

server.put("/tags/:id", (req, res) => {
    const id = req.params.id;
    const tag = req.body;
    if (!tag) res.status(400).json({ err });
    else {
        db("tags")
            .where({ id: Number(id) })
            .update(tag)
            .then(tag => {
                if (tag > 0) res.status(200).json(tag);
                else res.status(400).json({ err });
            })
            .catch(err => res.status(500).json(err));
    }
});

// GET posts by user id

server.get("/users/:id/posts", (req, res) => {
    db("posts")
        .where("userId", req.params.id)
        .then(posts => {
            if (posts.length > 0) res.status(200).json(posts);
            else res.status(200).json({ err });
        })
        .catch(err => res.status(500).json(err));
});

// GET tags by post id

server.get("/posts/:id/tags", (req, res) => {
    db("tags")
        .where("postId", req.params.id)
        .then(tags => {
            if (tags.length > 0) res.status(200).json(tags);
            else res.status(200).json({ err });
        })
        .catch(err => res.status(500).json(err));
});

const port = 3333;
server.listen(port, function () {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
