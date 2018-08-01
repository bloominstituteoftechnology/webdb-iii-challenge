const express = require("express");
const db = require("./data/db");
const server = express();

server.use(express.json());

// endpoints here
// Users
server.post("/users", (req, res) => {
  const user = req.body;
  db.insert(user)
    .into("users")
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ id, ...user });
    })
    .catch(error => res.status(500).json(error));
});

server.get("/users", (req, res) => {
  db("users")
    .then(response => res.status(200).json(response))
    .catch(error => res.status(500).json(error));
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
