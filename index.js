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

server.get("/cohorts/:id/students", (req, res) => {
  db("cohorts")
    .innerJoin("students", "cohorts.id", "students.cohort_id")
    .where("cohorts.id", req.params.id)
    .select({ name: "students.student_name", cohort: "cohorts.name" })
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

server.post("/cohorts", (req, res) => {
    if ( req.body != null && req.body.name != '') {
        db("cohorts")
        .insert(cohort)
        .then(ids => {
            res.status(200).json(ids);
        })
        .catch(err => {
            res.status(500).json(err);
        });
    } else {
        res.status(400).json({ error: "need cohort"});
    }
});

server.put("/cohorts/:id", (req, res) => {
    db("cohorts")
      .where({ id: req.params.id })
      .update(req.body)
      .then(ids => {
        res.status(200).json(ids);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  
  server.delete("/cohorts/:id", (req, res) => {
    db("cohorts")
      .delete()
      .where({ id: req.params.id })
      .then(ids => {
        res.status(200).json(ids);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  
  
  server.listen(3000, () =>
    console.log("\n = Running on Port 3000 =\n")
  );