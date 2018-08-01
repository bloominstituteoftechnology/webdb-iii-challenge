const express = require("express");

const db = require("./data/db");

// Routers
const userRouter = require("./routers/users");
const postRouter = require("./routers/posts");

const server = express();

// use middleware
server.use(express.json());

// endpoints here
server.get("/", (req, res) => {
  res.send("up and running");
});

// users
server.use("/users", userRouter);

// posts
server.use("/posts", postRouter);

// tags
server.get("/tags", (req, res) => {
  db("tags")
    .then(tag => {
      res.status(200).json(tag);
    })
    .catch(err => res.status(500).json(err));
});

server.get("/tags/:id", (req, res) => {
  const id = req.params.id;
  db("tags")
    .where("id", Number(id))
    .then(tag => res.status(200).json(tag))
    .catch(err => res.status(500).json(err));
});

server.post("/tags", (req, res) => {
  const tag = req.body;
  db.insert(tag)
    .into("tags")
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ id, ...tag });
    })
    .catch(err => res.status(500).json(err.message));
});

server.put("/tags/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  db("tags")
    .where("id", id)
    .update(changes)
    .then(ids => {
      const id = ids[0];
      res.status(200).json({ id, ...changes });
    })
    .catch(err => res.status(500).json(err));
});

server.delete("/tags/:id", (req, res) => {
  const id = req.params.id;
  db("tags")
    .where("id", id)
    .del()
    .then(ids => {
      const id = ids[0];
      res.status(200).json("TAG DELETED SUCCESSFULLY");
    })
    .catch(err => res.status(500).json(err));
});

const port = 8000;
server.listen(port, function() {
  console.log(`\n=== WEB API LISTENING ON HTTP://LOCALHOST:${port} ===\n`);
});
