// imports

const express = require("express");

// instantiate server
const server = express();
server.use(express.json());

// endpoints
server.post("/api/cohorts", (req, res) => {
  const cohort = req.body;
  db.insert(cohort)
    .into("cohorts")
    .then(ids => res.status(201).json(ids))
    .catch(err => res.status(500).json(err));
});

server.get("/api/cohorts", (req, res) => {
  db("cohorts")
    .select("name")
    .then(ids => res.status(200).json(ids))
    .catch(err => res.status(500).json({ error: "Could not retrieve data" }));
});

server.get("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  db("cohorts")
    .where({ id })
    .then(ids => {
      if (ids) {
        res.status(200).json(ids);
      } else {
        res
          .status(404)
          .json({ error: `Cohort with id of ${id} could not be found` });
      }
    })
    .catch(err => res.status(500).json({ error: "Could not retrieve data" }));
});

server.get("/api/cohorts/:id/students", (req, res) => {
  const { id } = req.params;
  db("students")
    .where({ id })
    .then(ids => {
      if (ids) {
        res.status(200).json(ids);
      } else {
        res
          .status(404)
          .json({ error: `Cohort with id of ${id} could not be found` });
      }
    })
    .catch(err => res.status(500).json({ error: "Could not retrieve data" }));
});

server.put("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db("cohorts")
    .where({ id })
    .update(changes)
    .then(count => res.status(200).json(count))
    .catch(err =>
      res
        .status(404)
        .json({ error: `Cohort with id of ${id} could not be found` })
    );
});

server.delete("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  db("cohorts")
    .where({ id })
    .del()
    .then(count => res.status(200).json(count))
    .catch(err =>
      res
        .status(500)
        .json({ error: `Cohort with id of ${id} could not be found` })
    );
});

// server port
server.listen(9000, () => {
  console.log("Server running on port 9000");
});

// knex
const knex = require("knex");
const knexConfig = require("./knexfile");

const db = knex(knexConfig.development);
