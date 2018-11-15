const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);
const server = express();

server.use(express.json());

// Testing API
server.get("/", (req, res) => {
  res.status(200).json({ message: "Server on board" });
});

const port = 3300;
server.listen(port, () => {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
