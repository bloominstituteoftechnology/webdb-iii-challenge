const express = require("express");
const cohortsRouter = require("./cohorts/cohortsRouter");

const server = express();

server.use(express.json());

server.get("/", (req, res) => res.send("Welcome!"));

server.use("/api/cohorts", cohortsRouter);

const port = 8000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
