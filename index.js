const express = require("express");

const configureMiddleware = require("./config/middleware");
const cohortRoute = require("./routes/cohortRoute");
const studentRoute = require("./routes/studentRoute");


const server = express();
const PORT = 5400;


configureMiddleware(server);

server.use("/api/cohorts", cohortRoute);
server.use("/api/students", studentRoute);

server.get("/", (req, res) => {
  res.send("RDBMS...");
});


server.listen(PORT, () =>
  console.log(`\n=== API Listening on http://localhost:${PORT} ===\n`)
);