const express = require("express");
const server = express();
const port = 9000;

const knex = require("knex");
const knexConfig = require("./knexfile.js");
const db = knex(knexConfig.development);

server.use(express.json());

const cohortRouter = require("./cohorts/cohortRouter");
const studentRouter = require("./students/studentRouter");

// R O O T
server.get("/", (req, res) => {
  res.send("yup");
});

// R O U T E S
server.use("/api/cohorts", cohortRouter);
server.use("/api/students", studentRouter);

server.listen(9000, () => console.log(`API running on port ${port}`));
