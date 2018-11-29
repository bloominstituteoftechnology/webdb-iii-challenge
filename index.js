const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile.js");

const server = express();
const db = knex(knexConfig.development);
const port = 9000;
server.use(express.json());

server.get("/api/cohorts", (req, res) => {
  db("cohorts")
    .then(cohort => {
      res.json(cohort);
    })
    .catch(err => res.status(500).json({ message: err }));
});

server.get("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  db("cohorts")
    .where({ id })
    .then(cohort => {
      res.json(cohort);
    })
    .catch(err => res.status(500).json({ message: err }));
});

server.post("/api/cohorts", (req, res) => {
  const cohort = req.body;
  db("cohorts")
    .insert(cohort)
    .then(cohort => {
      res.status(201).json(cohort);
    })
    .catch(err => res.status(500).json({ message: err }));
});

server.put("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db("cohorts")
    .where({ id })
    .update(changes)
    .then(count => {
      res.json({ count });
    })
    .catch(err => res.status(500).json(err));
});

server.delete("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  db("cohorts")
    .where({ id })
    .del()
    .then(count => {
      res.json({ count });
    })
    .catch(err => res.status(500).json(err));
});

server.listen(port, () => console.log(`\n API is running on port ${port} \n`));
