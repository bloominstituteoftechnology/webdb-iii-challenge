const express = require("express");
const helmet = require("helmet");
const knexConfig = require("./knexfile.js");
const knex = require("knex");
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

server.get("/api/cohorts", (req, res) => {
  db("cohorts")
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => res.status(500).json(err));
});

server.get("/api/cohorts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cohort = await db("zoos").where({ id });
    if (cohort) {
      res.status(200).json(cohort);
    } else {
      res.status(404).json({ message: "Cohort not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

server.post("/api/cohorts", (req, res) => {
  const cohort = req.body;
  db.insert(cohort)
    .into("cohorts")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.put("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db("cohorts")
    .where({ id: id })
    .update(changes)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: "No records found to update" });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
});

server.delete("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  db("cohorts")
    .where({ id })
    .delete(id)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: "No records found to delete" });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
});
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
