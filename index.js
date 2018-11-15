const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);
const server = express();

server.use(express.json());

// Testing API
server.get("/", (req, res) => {
  res.status(200).json({ message: "Server on board" });
});

// POST Cohorts to db

server.post("/api/cohorts", (req, res) => {
  const cohort = req.body;

  if (cohort.name === "") {
    res.status(400).json({ message: "Please include a name for the cohort" });
  } else {
    db("cohorts")
      .insert(cohort)
      .then(id => {
        res.status(201).json(id);
      })
      .catch(err => {
        res.status(500).json({
          message: "There was an error with posting a cohort, please try again"
        });
      });
  }
});

// GET Request for all cohorts

server.get("/api/cohorts", (req, res) => {
  db("cohorts")
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "There was an error getting all the cohorts" });
    });
});

// GET Request for individual cohorts

server.get("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  db("cohorts")
    .where("id", id)
    .then(cohorts => {
      if (!cohorts.length) {
        res
          .status(404)
          .json({ message: "Could not find Cohort with specified Id" });
      } else {
        res.status(200).json(cohorts);
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an error with your request, please try again."
      });
    });
});

// GET Requests for students

server.get("/api/cohorts/:id/students", (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("cohorts")
    .where({ "cohorts.id": id })
    .join("students", { "cohorts.id": "students.cohort_id" })
    .then(student => {
      res.status(200).json(student);
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an error with your request, please try again"
      });
    });
});

// PUT Request for Cohorts

server.put("/api/cohorts/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  if (changes.name === "") {
    res.status(400).json({ message: "Please include a name" });
  } else {
    db("cohorts")
      .where({ id })
      .update(changes)
      .then(count => {
        res.status(200).json({ message: `Updated ${count} cohort` });
      })
      .catch(err => {
        res.status(500).json({
          message: "There was an error updtating the cohort, please try again."
        });
      });
  }
});

server.delete("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;

  db("cohorts")
    .where({ id })
    .del()
    .then(count => {
      if (count === 0) {
        res
          .status(404)
          .json({ message: "Could not find cohort with specified id" });
      } else {
        res.status(200).json({ count });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({
          message: "There was an error deleting the cohort, please try again"
        });
    });
});

const port = 3300;
server.listen(port, () => {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
