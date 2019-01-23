const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile");
const server = express();

server.use(express.json());

const db = knex(knexConfig.development);

server.post("/api/cohorts", (req, res) => {
  db("cohorts")
    .insert(req.body)
    .then(ids => {
      db("cohorts")
        .where({ id: ids[0] })
        .then(cohort => {
          res.status(201).json(cohort);
        });
    })
    .catch(err => res.status(500).json(err));
});

server.get("/api/cohorts", (req, res) => {
  db("cohorts")
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get("/api/cohorts/:id", (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .then(results => {
      if (results) {
        res.status(200).json(results);
      } else {
        res.status(404).json({ message: "Cohort not found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.put("/api/cohorts/:id", (req, res) => {
  const edit = req.body;
  db("cohorts")
    .where({ id: req.params.id })
    .update(edit)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "Cohort not found" });
      }
    })
    .catch(err => res.status(500).json(err));
});

server.delete("/api/cohorts/:id", (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .del()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => res.status(500).json(err));
});

server.listen(5000, () => console.log("up and at em!"));
