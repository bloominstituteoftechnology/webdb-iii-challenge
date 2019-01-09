const express = require("express");
const knex = require("knex");

const dbConfig = require("./knexfile.js");

const db = knex(dbConfig.development);
const PORT = 5000;
const server = express();

server.use(express.json());



server.get("/api/cohorts", (req, res) => {
    const newCohort = req.body;
    db("cohorts")
    .insert(newCohort)
      .then(cohorts => {
          res.status(200).json(cohorts)
      })
      .catch(err => {
          res.status(500).json(err)
      });
  });


  
  server.get("/api/cohorts/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);
    db("cohorts")
      .where({ id: id })
      .then(name => {
          res.status(200).json(name)
      })
      .catch(err => {
          res.status(500).json({ error: err })
      });
  });



server.post("/api/cohorts", (req, res) => {
    const name = req.body;

    db("cohorts")
      .insert(name)
      .then(name => {
          res.status(201).json(name)
      })
      .catch(err => {
          res.status(500).json({ error: err })
      });
  });



server.put("/api/cohorts/:id", (req, res) => {
    const changes = req.body;
    const {id} = req.params;
    console.log(id);
    db("cohorts")
      .where({ id: id })
      .update(changes)
      .then(count => {
          res.status(200).json(count)
      })
      .catch(err => res.status(500).json({ error: err }));
  });



server.delete("/api/cohorts/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);
    db("cohorts")
      .where({id:id})
      .del()
      .then(ids => {
          res.status(200).json(ids)
      })
      .catch(err => {
          res.status(500).json({ error: err })
      });
  });




server.get("/api/students", (req, res) => {
    const newStudent = req.body;
    db("students")
    .insert(newStudent)
      .then(students => {
          res.status(200).json(students)
      })
      .catch(err => {
          res.status(500).json(err)
      });
  });


  
  server.get("/api/students/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);
    db("students")
      .where({ id: id })
      .then(name => {
          res.status(200).json(name)
      })
      .catch(err => {
          res.status(500).json({ error: err })
      });
  });



server.post("/api/students", (req, res) => {
    const name = req.body;

    db("students")
      .insert(name)
      .then(name => {
          res.status(201).json(name)
      })
      .catch(err => {
          res.status(500).json({ error: err })
      });
  });



server.put("/api/students/:id", (req, res) => {
    const changes = req.body;
    const {id} = req.params;
    console.log(id);
    db("students")
      .where({ id: id })
      .update(changes)
      .then(count => {
          res.status(200).json(count)
      })
      .catch(err => res.status(500).json({ error: err }));
  });



server.delete("/api/students/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);
    db("students")
      .where({id:id})
      .del()
      .then(ids => {
          res.status(200).json(ids)
      })
      .catch(err => {
          res.status(500).json({ error: err })
      });
  });




  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });