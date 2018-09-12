const express = require("express");
const knex = require("knex");
const server = express();

server.use(express.json());

const dbConfig = require("./knexfile.js");
const db = knex(dbConfig.development);

server.get("/api/cohorts", (req, res) => {
  db("cohorts")
    .select()
    .then(names => {
      res.status(200).json(names);
    })
    .catch(err => res.status(500).json(err));
});

server.get("/api/cohorts/:id", (req, res) => {
    const id = req.params.id
    db("cohorts")
      .where("id", "=", id)
      .select()
      .then(names => {
        res.status(200).json(names);
      })
      .catch(err => res.status(500).json(err));
  });

  server.get("/api/cohorts/:id/students", (req, res) => {
    const id = req.params.id
    db("students").where({cohort_Id: id})
      .then(names => {
        res.status(200).json(names);
      })
      .catch(err => res.status(500).json(err));
  });

server.post("/api/cohorts", (req, res) => {
  const name = req.body;
  console.log(name);
  db.insert(name)
    .into("cohorts")
    .then(names => {
      res.status(201).json(names);
    })
    .catch(err => res.status(500).json(err));
});

server.put("/api/cohorts/:id", (req, res) => {
    const name = req.body;
    const id = req.params.id;
    db("cohorts")
      .where("id", "=", id)
      .update(name)
      .then(count => {
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  server.delete("/api/cohorts/:id", (req, res) => {
    const { id } = req.params;
  
    db("cohorts")
      .where({ id })
      .del()
      .then(count => {
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  //Students
  server.get("/api/students", (req, res) => {
    db("students")
      .select()
      .then(names => {
        res.status(200).json(names);
      })
      .catch(err => res.status(500).json(err));
  });

  server.post("/api/students", (req, res) => {
    const name = req.body;
    console.log(name);
    db.insert(name)
      .into("students")
      .then(names => {
        res.status(201).json(names);
      })
      .catch(err => res.status(500).json(err));
  });
const port = 3000;
server.listen(port, function() {
  console.log(`\n Web API Listening on localhost:${port}\n`);
});
