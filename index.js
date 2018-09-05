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
server.get("/cohorts", (req, res) => {
  db("cohorts")
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => {
      res.status(500).json({ error: "The cohorts could not be retrieved." });
    });
});
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
