const express = require('express');
const knex = require('knex');

const server = express();
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

/* ---------- Middleware ---------- */
server.use(express.json());

/* ---------- Endpoints ---------- */

/* ---------- Listener ---------- */
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API listening on http://localhost:${port} ===\n`);
});