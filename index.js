const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const dbConfig = require("./knexfile");

const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

server.get("/cohorts", (req, res) => {
  db("cohorts")
    .then(cohorts => {
      res.status(201).json(cohorts);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get("/cohorts/:id", (req, res) => {
  db("cohorts")
    .where("cohorts.id", req.params.id)
    .then(cohort => {
      if (cohort.length === 0) {
        res.status(400).json({ message: "none with that ID" });
      } else {
        res.status(200).json(cohort);
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

