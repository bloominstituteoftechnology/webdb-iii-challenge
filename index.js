const express = require("express");
const helmet = require("helmet");

const cohortsRoutes = require("./cohorts/cohortsRoutes.js");
const studentsRoutes = require("./students/studentsRoutes.js");
const server = express();

server.use(helmet());
server.use(express.json());

// sanity check endpoint
server.get("/", (req, res) => {
  res.send("It's Alive");
});

server.use("/api/cohorts", cohortsRoutes);
server.use("/api/students", studentsRoutes);

server.listen(9000, () => console.log("\nAPI running on 9k\n"));
