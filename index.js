// update PUT https://youtu.be/7ncn9_5TSJc?t=46m51s

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
