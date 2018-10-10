const express = require("express");
const helmet = require("helmet");
const server = express();
const knex = require("knex");

// middleware
server.use(helmet());
server.use(express.json());

//connect to db
const knexConfig = require("./knexfile.js");
const db = knex(knexConfig.development);

console.log(db("cohorts"));

//Routers
server.get("/", (req, res) => {
  res.send("API is working");
});

server.get("/api/cohorts", (req, res) => {
  db("cohorts")
    .then(cohorts => res.json(cohorts))
    .catch(err => res.json(err));
});

server.listen(9000, () => {
  console.log("API is running");
});
