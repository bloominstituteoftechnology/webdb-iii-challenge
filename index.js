const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const knexConfig = require("./knexfile");

const server = express();
const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());

// GET //
server.get("/api/cohorts", (req, res) => {
  db("cohorts")
    .then(cohorts => res.status(200).json(cohorts))
    .catch(err => res.status(500).json(err));
});

server.get("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  db("cohorts")
    .where({ id })
    .first()
    .then(cohort => res.status(200).json(cohort))
    .catch(err => res.status(500).json(err));
});

server.get("/api/cohorts/:id/students", (req, res) => {
  const { id } = req.params;
  db("cohorts")
    .where({ id })
    .first()
    .then(cohort => {
      db("students")
        .where({ cohort_id: id })
        .then(students => res.status(200).json(students))
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
});
/////////

// POST //
server.post("/api/cohorts", (req, res) => {
  const { name } = req.body;
  const cohort = { name };
  db.insert(cohort)
    .into("cohorts")
    .then(confirmedNewCohort => res.status(201).json(confirmedNewCohort))
    .catch(err => res.status(500).json(err));
});
//////////
 
// PUT //
server.put("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const cohort = { name };
  db("cohorts")
    .where({ id })
    .update(cohort)
    .then(bool => res.status(200).json(bool))
    .catch(err => res.status(500).json(err));
});
/////////
 
// DELETE //
server.delete('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  db('cohorts')
    .where({id})
    .del()
    .then(bool => res.status(200).json(bool))
    .catch(err => res.status(200).json(err));
})
///////////

// server listener
server.listen(5000, () => console.log(`Server listening to port 5000`));