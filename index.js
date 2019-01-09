const express = require("express");
const knex = require("knex");

const dbConfig = require("./knexfile");

const server = express();
const db = knex(dbConfig.development);

const PORT = 5050;

server.use(express.json());

server.post("/api/cohorts", (req, res) => {
  const newCohort = req.body;
  db("cohorts")
    .insert(newCohort)
    .then(id => {
      res.status(201).json({ message: `cohort with id ${id} created` });
    })
    .catch(err => {
      res.status(500).json({ message: "could not create new cohort" });
    });
});

server.get("/api/cohorts", (req, res) => {
  db("cohorts")
    .then(cohorts => {
      res.json(cohorts);
    })
    .catch(err => {
      res.status(400).json({ message: "cohorts not found, look in slack" });
    });
});

server.get("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  db("cohorts")
    .where({ id: id })
    .then(cohorts => {
      res.json(cohorts);
    })
    .catch(err => {
      res.status(404).json({ message: `cohort with id ${id} not found.` });
    });
});

server.get("/api/cohorts/:id/students", (req, res) => {
  const { id } = req.params;
  db("students")
    .where({ cohort_id: id })
    .then(students => {
      res.json(students);
    })
    .catch(err => {
      res.status(404).json({ message: "students not found. they are hiding." });
    });
});

server.put("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  const updatedCohort = req.body;
  db("cohorts")
    .where({ id: id })
    .update(updatedCohort)
    .then(cohort => {
      res.json({ message: `cohort with id #${id} has been updated.` });
    })
    .catch(err => {
      res.status(500).json({ message: `cohort not updated.` });
    });
});

server.delete("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  db("cohorts")
    .where({ id: id })
    .del()
    .then(cohort => {
      res.json({ message: `record #${id} has been deleted` });
    })
    .catch(err => {
      res.status(500).json({ message: "could not delete record" });
    });
});

server.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
