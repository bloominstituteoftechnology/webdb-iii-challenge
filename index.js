const express = require("express");
const knex = require("knex");

const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

server.listen(3030, () => {
    console.log("Server started on port 3030.");
})

//------------------COHORTS----------------------------------

// GET

server.get("/api/cohorts", (req, res) => {
    db("cohorts")
    .then(cohorts => {
        res.status(200).json(cohorts)
    })
    .catch(err => {
        res.status(500).json(err)
    });
});

// GET BY ID

server.get("/api/cohorts/:id", (req, res) => {
    const { id } = req.params;
    db("cohorts")
      .where({ id: id })
      .then(name => {
          res.status(200).json(name)
      })
      .catch(err => {
          res.status(500).json({ error: err })
      });
  });

 // POST

 server.post("/api/cohorts", (req, res) => {
    const name = req.body;
    db("cohorts")
      .insert(name)
      .then(name => {
          res.status(201).json(name)
      })
      .catch(err => {
          res.status(500).json({ error: err })
      });
  });

 // UPDATE

 server.put("/api/cohorts/:id", (req, res) => {
    const changes = req.body;
    const {id} = req.params;
    db("cohorts")
      .where({ id: id })
      .update(changes)
      .then(count => {
          res.status(200).json(count)
      })
      .catch(err => res.status(500).json({ error: err }));
  });

 // DELETE

 server.delete("/api/cohorts/:id", (req, res) => {
    const { id } = req.params;
    db("cohorts")
      .where({ id: id })
      .del()
      .then(ids => {
          res.status(200).json(ids)
      })
      .catch(err => {
          res.status(500).json({ error: err })
      });
  });