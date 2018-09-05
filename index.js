const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const dbConfig = require("./knexfile");

const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

// server.get("/", (req, res) => {
//   res.send("API Running...");
// });

// cohorts//////////////////////
// GET
server.get("/api/cohorts", (req, res) => {
  db("cohorts")
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => {
      res.status(500).json({ error: "The cohorts could not be retrieved." });
    });
});

server.get("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  db("cohorts")
    .where({ id })
    .then(cohort => {
      if (cohort.length === 0) {
        res.status(404).json({
          message: "The cohort with the specified ID does not exist.",
        });
      } else {
        return res.status(200).json({ cohort });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The cohort could not be retrieved." });
    });
});
// end get

// start POST
server.post("/api/cohorts", (req, res) => {
  const cohort = req.body;
  if (!cohort.name) {
    return res.status(406).json({
      errorMessage: "Please provide a name for the cohort.",
    });
  } else {
    db("cohorts")
      .insert(cohort)
      .into("cohorts")
      .then(cohorts => {
        res.status(201).json({ message: "Cohort successfully added." });
      })
      .catch(err => {
        res.status(500).json({ error: "The cohort could not be added." });
      });
  }
});
// end POST

// start DELETE
server.delete("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;

  db("cohorts")
    .where({ id })
    .del()
    .then(cohorts => {
      if (cohorts === 0) {
        res.status(404).json({
          message: "The cohort with the specified ID does not exist.",
        });
      } else {
        res.status(200).json({ message: "Cohort removed successfully." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The cohort could not be removed." });
    });
});
// end DELETE

// start PUT
server.put("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  const newName = req.body.name;
  if (!newName) {
    return res.status(406).json({
      errorMessage: "Please provide a name for the cohort.",
    });
  } else {
    db("cohorts")
      .where({ id })
      .update({ name: newName })
      .then(cohorts => {
        res.status(200).json({ message: "Cohort successfully modified." });
      })
      .catch(err => {
        res.status(500).json({ error: "The cohort could not be updated." });
      });
  }
});
// end PUT
// end cohorts//////////////////////

// students//////////////////////
// GET
server.get("/students", (req, res) => {
  db("students")
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => {
      res.status(500).json({ error: "The students could not be retrieved." });
    });
});
// end students//////////////////////

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
