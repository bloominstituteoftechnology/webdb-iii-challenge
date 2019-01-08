const express = require('express');
const knex = require('knex');

// const dbConfig = require('./knexfile.js')

const app = express();
// const db = knex(dbConfig.development);
const PORT = 8080;

app.use(express.json());

// POST /api/cohorts

// GET /api/cohorts

// GET /api/cohorts/:id

// GET /api/cohorts/:id/students

// PUT /api/cohorts/:id

// DELETE /api/cohorts/:id

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
