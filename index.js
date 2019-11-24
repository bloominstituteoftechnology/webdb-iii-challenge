const express = require("express");
const server = express();
const knex = require("knex");
const helmet = require("helmet");
const dbConfig = require("./knexfile");

const db = knex(dbConfig.development);

server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("API Running...");
});

server.post("/api/cohorts", (req, res) => {
  const cohort = req.body;
  console.log("cohort: ", cohort);
  db.insert(cohort)
    .into("cohorts")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});


//get all cohorts
server.get("/api/cohorts", (req, res) => {
  db("cohorts")
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => res.status(500).json(err));
});


//get by id
server.get("/api/cohorts/:id", (req, res) => {
  const id = req.params.id;

  db("cohorts")
    .select()
    .where("id", id)
    .then(cohorts => {
      if (cohorts) {
        res.status(200).json(cohorts);
      } else {
        res.status(404).json({ message: "No cohort Found" });
      }
    })
    .catch(err => {
      console.log("Error", err);
      res.status(500).json({ message: "Error getting the information" });
    });
});


server.get("/api/cohorts/:id/students", (req, res) =>{
    // console.log("testing")
    db("students")
        .select()
        .where({cohort_id: req.params.id})
        .then(students => {
            res.status(200).json(students);
        })
        .catch(err => res.status(500).json(err));
})



server.listen(8000, () =>
  console.log("=======API Running on port 8000=======")
);
