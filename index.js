const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const knexConfig = require("./knexfile");

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

// zoos

server.get("/api/cohorts", (req, res) => {
  db("cohorts")
    .then(cohorts => res.status(200).json(cohorts))
    .catch(err => res.status(500).json({ error: err }));
});

server.get("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  db("cohorts")
    .where({ id: id })
    .first()
    .then(cohort => res.status(200).json(cohort))
    .catch(err => res.status(500).json({ error: err }));
});

server.get("/api/cohorts/:id/students", (req, res) => {
  const { id } = req.params;
  db("students")
    .where({ cohort_id: id })
    .first()
    .then(students => res.status(200).json(students))
    .catch(err => res.status(500).json({ error: err }));
});

server.post("/api/cohorts", (req, res) => {
  const cohort = req.body;
  db("cohorts")
    .insert(cohort)
    .then(id => {
      res.status(201).json(`Added cohort with id of ${id}`);
    })
    .catch(err => {
      res.status(500).json({ message: "Error inserting", err });
    });
});

server.put("/api/cohorts/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db("cohorts")
    .where({ id: id })
    .update(changes)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

server.delete("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;

  db("cohorts")
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

server.get("/api/students", (req, res) => {
  db("students")
    .then(students => res.status(200).json(students))
    .catch(err => res.status(500).json({ error: err }));
});

server.get("/api/students/:id", (req, res) => {
  const { id } = req.params;
  db("students")
    .where({ id: id })
    .first()
    .then(student => {
      console.log(student);
      db("cohorts")
        .where({ id: student.cohort_id })
        .first()
        .then(cohort =>
          res
            .status(200)
            .json({ id: student.id, name: student.name, cohort: cohort.name })
        );
    })
    .catch(err => res.status(500).json({ error: err }));
});

server.post("/api/students", (req, res) => {
  const student = req.body;
  db("students")
    .insert(student)
    .then(id => {
      res.status(201).json(`Added student with id of ${id}`);
    })
    .catch(err => {
      res.status(500).json({ message: "Error inserting", err });
    });
});

server.put("/api/students/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db("students")
    .where({ id: id })
    .update(changes)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

server.delete("/api/students/:id", (req, res) => {
  const { id } = req.params;

  db("students")
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
