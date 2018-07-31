const express = require("express");

const db = require("./data/db");

const server = express();

server.use(express.json());

// endpoints here

const port = 8000;
server.listen(port, function() {
  console.log(`\n=== WEB API LISTENING ON HTTP://LOCALHOST:${port} ===\n`);
});
