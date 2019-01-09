const express = require('express');
const knex = require('knex');

const server = express();
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

// Middleware requires
const cohortRouter = require('./routes/cohorts');
const studentRouter = require('./routes/students');

/* ---------- Middleware ---------- */
server.use(express.json());

/* ---------- Endpoints ---------- */
server.use('/api/cohorts', cohortRouter);
server.use('/api/students', studentRouter);

/* ---------- Listener ---------- */
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API listening on http://localhost:${port} ===\n`);
});