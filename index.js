const express = require("express");
const helmet = require("helmet");
const server = express();

const cohortsRoutes = require("./routes/cohortsRouter.js");
const studentsRoutes = require("./routes/studentsRouter.js");

// middleware
server.use(helmet());
server.use(express.json());
server.use("/api/cohorts/", cohortsRoutes);
server.use("/api/students/", studentsRoutes);
//connect to db
// const knexConfig = require("./knexfile.js");
// const db = knex(knexConfig.development);

//Routers
server.get("/", (req, res) => {
  res.send("API is working");
});

server.listen(9000, () => {
  console.log("API is running");
});
