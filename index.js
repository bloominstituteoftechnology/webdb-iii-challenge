//add requires
const express = require("express");
const knex = require("knex");
const server = express();

//configure database and port
const dbConfig = require("./knexfile.js");
const PORT = 6000;
const db = knex(dbConfig.development);

server.use(express.json());

//save new cohort to database
server.post("/api/cohorts", (req, res) => {
   const cohort = req.body;
   db("cohorts").insert(cohort)
      .then(ids => {res.status(201).json(ids)})
      .catch(err => {res.status(500).json({error: "Error adding cohort"})});
});

//get all cohorts
server.get("/api/cohorts", (req, res) => {
   db.get("cohorts")
      .then(rows => {res.json(rows)})
      .catch(err => {res.status(500).json({error: "Error retreiving cohorts"})});
});

//get cohort by id
server.get("/api/cohorts/:id", (req, res) => {
   id = req.params;
   db.get("cohorts").where("id", id)
      .then(rows => {res.json(rows)})
      .catch(err => {res.status(500).json({error: `error retreving cohort ${id}`})})
});

//get all students from certain cohort
server.get("/api/cohorts/:id/students", (req, res) => {
   cohort_id = req.params;
   db.get("students").where("cohort_id", cohort_id)
      .then(rows => {res.json(rows)})
      .catch(err => {res.status(500).json({error: `error retreving cohort ${id}`})})
});

//update cohort info
server.put("/api/cohorts/:id", (req, res) => {
   const id = req.params;
   const cohort = req.body;
   db("cohorts").where("id", id)
      .then(rowCount => {res.json(rowCount);})
      .catch(err => {res.status(500).json({error: `error updating cohort ${id}`})})
});

//delete cohort
server.delete("/api/cohorts/:id", (req, res) => {
   const id = req.params;
   db("cohorts").where("id", id)
      .then(rowCount => {res.json(rowCount)})
      .catch(err => {res.status(500).json({error: `error removing cohort ${id}`})})
});

server.listen(PORT, () => {
   console.log(`server running on port ${PORT}`)
});