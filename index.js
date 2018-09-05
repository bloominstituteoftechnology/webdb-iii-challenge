const express = require("express");
const knex = require("knex");
const dbconfig = require("./knexfile");
const db = knex(dbconfig.development);
const server = express();

server.use(express.json());

server.get("/cohorts", (req, res) => {
  db("cohorts")
    .then(cohorts => {
      res.status(201).json(cohorts);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "error fetching data" });
    });
});

server.get("/cohorts/:id", (req, res) => {
    db("cohorts")
      .where( 'cohorts.id', req.params.id)
      .then(cohort => {
        console.log(cohort);
        if (cohort.length === 0){
          res
          .status(404)
          .json({ message: "The cohort with the specified ID does not exist" });
        } else {
        res.status(200).json(cohort);}
      })
      .catch(err => {
        console.log("error", err);
        res.status(500).json({ message: "error fetching data" });
      });
});

server.get("/cohorts/:id/students", (req, res) => {
  db("cohorts")
    .innerJoin('students', 'cohorts.id', 'students.cohort_id')
    .where( 'cohorts.id', req.params.id)
    .select({name: 'students.student_name', cohort: 'cohorts.name'})
    .then(cohort => {
      console.log(cohort);
      if (cohort.length === 0){
        res
        .status(404)
        .json({ message: "The cohort with the specified ID does not exist" });
      } else {
      res.status(200).json(cohort);}
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "error fetching data" });
    });
});

server.post("/cohorts", (req, res) => {
  const cohort = req.body;
  if (cohort != null && cohort.name != "") {
    db("cohorts")
      .insert(cohort)
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => {
        console.log("error", err);
        res.status(500).json({ message: "error posting data" });
      });
  } else {
    res.status(400).json({ error: "Please provide a cohort name" });
  }
});

server.put("/cohorts/:id", (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .update(req.body)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "error updating data" });
    });
});

server.delete("/cohorts/:id", (req, res) => {
  db("cohorts")
    .delete()
    .where({ id: req.params.id })
    .then(cohort => {
      res.status(200).json(cohort);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "error deleting data" });
    });
});


server.listen(3400, () =>
  console.log("\n~~~~~~ Henlo on port 3400 ~~~~~~\n")
);