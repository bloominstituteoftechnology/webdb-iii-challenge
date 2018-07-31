const express = require("express");

const db = require("./data/db");

const server = express();

// use middleware
server.use(express.json());

// endpoints here
server.get("/", (req, res) => {
  res.send("up and running");
});

// users
server.get("/users", (req, res) => {
  db("users")
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => res.status(500).json(err));
});

server.get("/users/:id", (req, res) => {
  const id = req.params.id;
  db("users")
    .where("id", Number(id))
    .first()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => res.status(500).json(err));
});

server.post("/users", (req, res) => {
  const user = req.body;
  db.insert(user)
    .into("users")
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ id, ...user });
    })
    .catch(err => res.status(500).json(err));
});

server.put("/users/:id", (req, res) => {
  const user = req.body;
  const id = req.params.id;
  db("users")
    .where("id", id)
    .update(user)
    .then(ids => {
      const id = ids[0];
      res.status(200).json({ id, ...user });
    })
    .catch(err => res.status(500).json(err));
});

server.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  db("users")
    .where("id", id)
    .del()
    .then(ids => {
      const id = ids[0];
      res.status(200).json("USER DELETED SUCCESSFULLY");
    })
    .catch(err => res.status(500).json(err));
});

// posts
server.get("/posts", (req, res) => {
  db("posts")
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => res.status(500).json(err));
});

server.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  db("posts")
    .where("id", Number(id))
    .first()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => res.status(500).json(err));
});

server.post("/posts", (req, res) => {
  const post = req.body;
  db.insert(post)
    .into("posts")
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ id, ...post });
    })
    .catch(err => res.status(500).json(err));
});

server.put("/posts/:id", (req, res) => {
  const post = req.body;
  const id = req.params.id;
  db("posts")
    .where("id", id)
    .update(post)
    .then(ids => {
      const id = ids[0];
      res.status(200).json({ id, ...post });
    })
    .catch(err => res.status(500).json(err));
});

server.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  db("posts")
    .where("id", id)
    .del()
    .then(ids => {
      const id = ids[0];
      res.status(200).json("POST DELETED SUCCESSFULLY");
    })
    .catch(err => res.status(500).json(err));
});

// tags

const port = 8000;
server.listen(port, function() {
  console.log(`\n=== WEB API LISTENING ON HTTP://LOCALHOST:${port} ===\n`);
});
