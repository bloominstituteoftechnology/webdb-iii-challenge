const express = require("express");
const bodyParser = require("body-parser");
const knex = require("./database/db.js");

const server = express();

server.use(bodyParser.json());

server.get("/", function(req, res) {
  res.status(200).json({ success: true });
});
server.get("/api/users", function(req, res) {
  const { id } = req.params;
  knex("users").then(function(records) {
    res.status(200).json(records);
  });
});
server.get("/api/users/:id", function(req, res) {
  const { id } = req.params;
  knex("users")
    .where("id", id)
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
});
server.post("/api/users", function(req, res) {
  const users = req.body;
  knex
    .insert(users)
    .into("users")
    .then(function(ids) {
      res.status(201).json({ ids });
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
});

server.put("/api/users/:id", function(req, res) {
  const { user_name } = req.body;
  const { id } = req.params;
  knex("users")
    .where("id", id)
    .update({
      'user_name': user_name
    })
    .then(isUserUpdated => {
      res.status(200).json({ message: "User has been updated" });
    })
    .catch(error => {
      res.status(422).json(error);
    });
});

server.delete('/api/users/:id', function(req, res) {
    const { id } = req.params;
    knex('users')
    .where('id', id)
    .del()
    .then(() => {
        res.status(200).json({message: 'user has been deleted'});
    })
    .catch((error) => {
        res.status(422).json(error);
    });
});

server.post("/api/posts", function(req, res) {
    const posts = req.body;
    const userId = req.body;
    knex
      .insert(userId, posts)
      .into("posts")
      .then(function(ids) {
        res.status(201).json({ ids });
      })
      .catch(function(error) {
        res.status(500).json({ error });
      });
  });

  server.get("/api/posts", function(req, res) {
    knex("posts")
      .then(function(records) {
        res.status(200).json(records);
      })
      .catch(function(error) {
        res.status(500).json({ error });
      });
  });






    const port = 3001;
server.listen(port, function() {
  console.log(`Server Listening on ${port}`);
});
