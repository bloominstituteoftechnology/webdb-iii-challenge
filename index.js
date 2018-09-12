const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

// or we could name knexConfig
const dbConfig = require("./knexfile.js");

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// server sanity check
server.get("/", (req, res) => {
  res.send("API Running...");
});

// post - create a new cohort in the cohorts table
server.post("/api/cohorts", (req, res) => {
    const cohort = req.body;
    // insert into cohorts
    db.insert(cohort)
      .into("cohorts")
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => res.status(500).json(err));
  });
  
  // get - read the array of cohort objects
  server.get("/api/cohorts", (req, res) => {
  
    db("cohorts")
      .select("name")
      .then(cohorts => {
        res.status(200).json(cohorts);
      })
      .catch(err => res.status(500).json(err));
  });
  
  // get by id - read the cohort associated with the given id
  server.get("/api/cohorts/:id", (req, res) => {
    const { id } = req.params;
  
    db("cohorts")
      .where("id", "=", id)
      .then(cohorts => {
        res.status(200).json(cohorts);
      })
      .catch(err => res.status(500).json(err));
  });
  
  // put
  server.put("/api/cohorts/:id", (req, res) => {
    const changes = req.body;
    const { id } = req.params;
  
    db("cohorts")
      .where("id", "=", id) // or .where({ id: id })
      .update(changes)
      .then(count => {
        // count === number of records updated
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  
  // delete
  server.delete("/api/cohorts/:id", (req, res) => {
    const { id } = req.params;
  
    db("cohorts")
      .where({ id }) // or .where(id, '=', id)
      .del()
      .then(count => {
        // count === number of records deleted
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });


// Port setup
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
