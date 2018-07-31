const express = require("express");
const db = require("./data/db");
const server = express();
server.use(express.json());

//endpoints

server.get("/", (req, res) => {
  res.send("working...");
});

//users
server.get("/users", (req, res) => {
  db("users")
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});
server.post("/users", (req, res) => {
  const user = req.body;
  db.insert(user)
    .into("Users")
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ id, ...user });
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the user to the database."
      });
    });
});

//posts
server.get("/posts", (req, res) => {
  db("Posts")
    .then(Posts => {
      res.status(200).json(Posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});
server.post("/posts", (req, res) => {
  const post = req.body;
  db.insert(post)
    .into("Posts")
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ id, ...post });
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the user to the database."
      });
    });
});

//tags
server.get("/tags", (req, res) => {
  db("Tags")
    .then(Tags => {
      res.status(200).json(Tags);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});
server.post("/tags", (req, res) => {
  const tag = req.body;
  db.insert(tag)
    .into("Tags")
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ id, ...tag });
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the user to the database."
      });
    });
});

const port = 8000;
server.listen(port, function() {
  console.log(`Web API listening on http://localhost:${port}`);
});
