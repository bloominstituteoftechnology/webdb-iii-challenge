const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const dbConfig = require("./knexfile");

const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Running...");
});

server.get("/cohorts", (req, res) => {
  db("cohorts")
    .then(cohorts => res.status(200).json(cohorts))
    .catch(err => res.status(500).json(err));
});

server.get("/cohorts/:id", (req, res) => {
  const { id } = req.params;
  db("cohorts")
    .where({ id })
    .then(id => res.status(200).json(id))
    .catch(err => res.status(500).json(err));
});

server.post("/cohorts", (req, res) => {
  const cohort = req.body;
  db("cohorts")
    .insert(cohort)
    .into("cohorts")
    .then(newCohort => res.status(200).json(newCohort))
    .catch(err => res.status(500).json(err));
});

server.delete("/cohorts/:id", (req, res) => {
  const { id } = req.params;
  db("cohorts")
    .where({ id })
    .del()
    .then(deleted => {
      if (deleted) res.status(200).json(deleted);
      else res.status(404).json({ error: "id not found" });
    })
    .catch(err => res.status(500).json(err));
});

server.put("/cohorts/:id", (req, res) => {
  const { id } = req.params;
  db("cohorts")
    .where({ id })
    .update(req.body)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "id not found" });
      }
    })
    .catch(err => res.status(500).json(err));
});

// student

server.get("/students", (req, res) => {
    const {id} = req.params;
    db("students")
      .then(students => res.status(200).json(students))
      .catch(err => 
        res.status(500).json(err));
  });

server.get("/students/:id", (req, res)=>{
  const {id} = req.params;
  db("students")
    .where({id})
    .then(student => res.status(200).json(student))
    .catch(err => res.status(500).json(err)); 
})

server.get("/cohorts/:id/students", (req, res)=>{
  const {id} = req.params; 
  db("cohorts")
    .where({id}, "cohorts.id")
    .innerJoin('students', 'cohorts.id', 'students.cohort_id')
    .select({name: 'students.name', cohort: 'cohorts.name'})
    .then(group =>{
      if(group) res.status(200).json(group)
      else res.status(404).json({message:"id not found"})
    })
    .catch(err => res.status(500).json(err))
})
server.listen(4000, function() {
  console.log("//======Server 4k=========//");
});
