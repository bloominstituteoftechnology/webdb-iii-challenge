//dependency imports
const express = require("express");
const knex = require("knex");

//in-app imports
const knexConfig = require("./knexfile.js");

//initialize db and server
const db = knex(knexConfig.development);
const server = express();

//middleware
server.use(express.json());

// endpoints
server.get("/", (req, res) => {
  res.json({ api: "running" });
});

server.post("/api/cohorts", (req, res) => {
  const cohort = req.body;
  if (!cohort.name) {
    res
      .status(400)
      .json({ message: "Please include a name for the new cohort." });
  } else {
    db("cohorts")
      .insert(cohort)
      .then(id => res.status(201).json(id))
      .catch(err =>
        res
          .status(500)
          .json({ error: "An error occurred while saving this cohort." })
      );
  }
});

server.get("/api/cohorts", (req, res) => {
  db("cohorts")
    .then(cohorts => res.status(200).json(cohorts))
    .catch(err =>
      res
        .status(500)
        .json({ error: "An occurred while retrieving the list of cohorts." })
    );
});

server.get("/api/cohorts/:id", (req, res) => {
  const cohortId = req.params.id;
  db("cohorts")
    .where({ id: cohortId })
    .then(cohort => {
      if (cohort) {
        res.status(200).json(cohort);
      } else {
        res
          .status(404)
          .json({ message: "The cohort with that ID doesn't exist." });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "An error occurred while retrieving that cohort." })
    );
});

server.listen(8000, () => console.log("\nNow listening on port 8000\n"));
