const express = require("express");
const knex = require("knex");

const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

/*[POST] /api/cohorts This route should save a new cohort to the database.
[GET] /api/cohorts This route will return an array of all cohorts.
[GET] /api/cohorts/:id This route will return the cohort with the matching id.
[GET] /api/cohorts/:id/students returns all students for the cohort with the specified id.
[PUT] /api/cohorts/:id This route will update the cohort with the matching id using information sent in the body of the request.
[DELETE] /api/cohorts/:id This route should delete the specified cohort.
*/

server.post("/api/cohorts", (req, res) => {
  const cohort = req.body;

  db("cohorts")
    .insert(cohort)
    .returning("id")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get("/api/cohorts", (req, res) => {
  db("cohorts")
    .then(cohorts => res.status(200).json(cohorts))
    .catch(err => res.status(500).json(err));
});

server.get("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;

  db("cohorts")
    .where({ id: id })
    .then(cohort => {
      res.status(200).json(cohort);
    })
    .catch(err => res.status(500).json(err));
});

server.get("/api/cohorts/:id/students", (req, res) => {
  const { id } = req.params;

  db("students")
    .where({ cohort_id: id })

    .then(students => res.status(200).json(students));
});

server.put("/api/cohorts/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db("cohorts")
    .where({ id: id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

server.delete("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;

  db("cohorts")
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

server.listen(9000, () => console.log("server running on port 9000"));
