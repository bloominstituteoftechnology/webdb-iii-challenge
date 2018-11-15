const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const knexConfig = require("./knexfile.js");

const server = express();
const db = knex(knexConfig.development);
server.use(express.json());
server.use(helmet());

//========================================================================== Sanity Check <----
server.get("/", (req, res) => {
  res.json({ api: "running" });
});
//========================================================================== Sanity Check <----
server.get("/api/cohorts", (req, res) => {
  db("cohorts")
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json(err));
});

//========================================================================== Server Init <----
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
