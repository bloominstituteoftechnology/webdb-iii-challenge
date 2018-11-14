const express = require("express");
const knex = require("knex");

const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

server.post("/api/cohorts", (req, res) => {
  const cohort = req.body;
  console.log(req.body);

  db("cohorts")
    .insert(cohort)
    .returning("id")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ message: "Error inserting", err });
    });
});

server.get("/api/cohorts", (req, res) => {
  db("cohorts")
    .then(cohorts => res.status(200).json(cohorts))
    .catch(err => res.status(500).json(err));
});

server.get("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  db("cohorts")
    .where({ id: id })
    .then(name => res.status(200).json(name))
    .catch(err => res.status(500).json({ error: err }));
});

server.get("/api/cohorts/:id/students", (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  db("students")
    .where({ cohort_id: id })
    .then(name => res.status(200).json(name))
    .catch(err => res.status(500).json({ error: err }));
});

server.put("/api/cohorts/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  db("cohorts")
    .where({ id: id })
    .update(changes)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json({ error: err }));
});

server.delete("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  db("cohorts")
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json({ error: err }));
});

server.listen(6000, () => console.log("\n== Port 6k ==\n"));
